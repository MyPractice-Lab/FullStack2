# Documento de cobertura del testing

## Tienda online "The Zone" - DSY1104 Evaluación Parcial 2

| Campo | Detalle |
|---|---|
| Fecha | 23-10-2026 |
| Integrantes | Maximiliano Provoste - Patricio Ormazabal - Basthian Vernal |
| Herramientas | Vitest 5, Testing Library, jsdom, Chromium (Playwright) |
| Pruebas escritas | 4 archivos, 12 casos |
| Resultado de la última corrida | 12 de 12 aprobadas |

---

## 1. Propuesta de pruebas

El anexo de la evaluación propone verificar cuatro cosas en los componentes de React:
**renderizado**, **props**, **estado** y **eventos**. Esas cuatro cosas no se prueban bien con
la misma herramienta, así que el proyecto trabaja en dos niveles.

| Nivel | Qué prueba | Dónde corre | Por qué ahí |
|---|---|---|---|
| **Automáticas** (unitarias) | Props, renderizado y renderizado condicional de un componente aislado. | jsdom, sin navegador. | Son rápidas (milisegundos) y no necesitan pintar nada: basta con el árbol de elementos en memoria. Permiten probar casos límite que en el navegador serían engorrosos de montar. |
| **Funcionales** | Flujos completos de usuario: varios componentes, navegación entre rutas, estado compartido y persistencia. | Chromium real. | Un flujo de compra involucra clics, cambio de ruta, contexto y `localStorage`. Probarlo en un navegador de verdad es lo único que demuestra que el recorrido completo funciona como lo va a vivir el cliente. |

### Por qué Vitest y no Jasmine con Karma

El anexo propone Jasmine y Karma. El proyecto usa **Vitest** porque:

1. Karma está descontinuado desde 2023 y Jasmine no entiende JSX ni módulos ES sin una
   cadena de herramientas adicional.
2. Vitest reutiliza la configuración de Vite que el proyecto ya tiene: las pruebas importan
   los componentes con los mismos alias y el mismo preprocesado que la aplicación, sin
   duplicar configuración.
3. Vitest trae *browser mode*, que ejecuta las pruebas dentro de Chromium con Playwright.
   Eso cubre lo que en el esquema antiguo hacía Karma, pero con la API moderna.

La estructura de las pruebas (`describe`, `test`, `expect`, dobles de prueba) es la misma que
en Jasmine, de modo que el contenido de lo que se verifica no cambia respecto de lo propuesto
por el docente.

### Configuración

`vite.config.js` declara dos proyectos de prueba:

| Proyecto | Archivos | Entorno | Comando |
|---|---|---|---|
| `unitarias` | `src/**/*.test.jsx` | jsdom + Testing Library | `npm run test:unit` |
| `funcionales` | `src/**/*.funcional.jsx` | Chromium headless + Playwright | `npm run test:funcional` |

`npm test` ejecuta los dos. Cada prueba parte de `localStorage.clear()`, de modo que ninguna
depende del resultado de la anterior.

---

## 2. Pruebas automáticas

### 2.1. `src/componentes/atomos/Boton.test.jsx` - props y eventos

Prueba el átomo `Boton`, que es el componente más reutilizado del proyecto: aparece en las
tarjetas de producto, en el carrito, en el checkout y en todos los formularios.

| Caso | Qué verifica | Categoría del anexo |
|---|---|---|
| Muestra la etiqueta que recibe por props | El texto que se le pasa como hijo se renderiza y queda accesible por su rol de botón. | Props / renderizado |
| Ejecuta la función `onClick` que recibe por props | Al hacer clic, la función recibida se llama exactamente una vez. | Props / eventos |
| No ejecuta `onClick` cuando `deshabilitado` es verdadero | El botón queda deshabilitado y el clic no dispara la función. | Renderizado condicional / eventos |
| Aplica la variante de peligro | La prop `variante="peligro"` se traduce a la clase `btn-danger` de Bootstrap. | Props |

Es la prueba que pide textualmente el anexo: *"asegúrate de que un componente de botón recibe
correctamente la etiqueta y la función de evento onClick"*.

### 2.2. `src/componentes/organismos/RejillaProductos.test.jsx` - renderizado de listas

Prueba el organismo que dibuja el catálogo a partir de un arreglo de productos. Se le entrega
un conjunto de datos fijo de tres productos: uno en oferta, uno normal y uno sin stock.

| Caso | Qué verifica | Categoría del anexo |
|---|---|---|
| Renderiza una tarjeta por cada producto | La cantidad de títulos de nivel 3 coincide con la cantidad de productos, y cada nombre aparece en pantalla. | Renderizado correcto |
| Muestra el precio rebajado y el anterior solo si hay oferta | El producto en oferta muestra los dos precios y el porcentaje de descuento; el producto normal muestra solo uno. | Renderizado condicional |
| Marca como agotado el producto sin stock | Aparece la etiqueta "Sin stock" y exactamente un botón "Agregar" queda deshabilitado. | Renderizado condicional |
| Muestra el mensaje de vacío | Con un arreglo vacío se muestra el aviso y no se dibuja ninguna tarjeta. | Renderizado condicional |

Cubre lo que pide el anexo: *"asegúrate de que los componentes de lista rendericen todos los
elementos de un conjunto de datos"* y *"verifica que un mensaje solo se muestre cuando
corresponde"*.

---

## 3. Pruebas funcionales

Las dos montan la aplicación completa (`App` dentro de `MemoryRouter` y de los proveedores de
sesión y carrito) y la manejan como lo haría una persona, dentro de Chromium.

### 3.1. `src/test/compra.funcional.jsx` - el flujo de compra

| Caso | Recorrido | Qué se comprueba |
|---|---|---|
| La compra completa termina en la boleta | `/productos` → agregar al carrito → `/carrito` → `/checkout` → pagar aprobado → boleta | Aparece el aviso de producto agregado; el total del carrito es $52.980 (producto en oferta $47.990 + $4.990 de despacho); el checkout valida y acepta los datos; la boleta muestra "Se ha realizado la compra" y el total pagado; en `localStorage` queda una orden en estado `pagada` y el carrito queda vacío. |
| El pago rechazado conserva el carrito | Mismo recorrido, eligiendo "pago rechazado por el banco" | Se muestra "No se pudo realizar el pago" con el botón para reintentar; la orden queda registrada en estado `rechazada`; el carrito **no** se vacía. |

Esta prueba es la que más valor aporta: toca las cuatro categorías del anexo a la vez
(renderizado, props, estado compartido y eventos) y además verifica la persistencia, que es un
requisito propio de esta entrega.

### 3.2. `src/test/registro.funcional.jsx` - validación del registro

| Caso | Recorrido | Qué se comprueba |
|---|---|---|
| Muestra los errores propios de cada campo | Enviar el formulario vacío y luego con datos insuficientes | Aparecen los mensajes personalizados de nombre, correo, contraseña y términos; al escribir "Ana" aparece "Escribe nombre y apellido separados por un espacio"; con una clave de 6 caracteres aparece "La contraseña debe tener al menos 8 caracteres. Escribiste 6."; no se crea ninguna cuenta. |
| El registro válido crea la cuenta | Completar todos los campos correctamente | Aparece el mensaje de éxito y la cuenta queda guardada en `localStorage` con rol `cliente` y la comuna elegida. |

Cubre las pruebas de **estado** (el formulario cambia conforme el usuario escribe, y la lista
de comunas se repuebla al cambiar la región) y de **renderizado condicional** (los mensajes de
error solo aparecen cuando el campo está mal).

---

## 4. Resumen de la cobertura

| Categoría pedida por el anexo | Prueba que la cubre |
|---|---|
| Renderizado correcto de listas | `RejillaProductos` - caso 1 |
| Renderizado condicional | `RejillaProductos` - casos 2, 3 y 4; `registro.funcional` - caso 1 |
| Props recibidas | `Boton` - casos 1, 2 y 4 |
| Gestión del estado | `registro.funcional` - casos 1 y 2; `compra.funcional` - cantidades y totales |
| Simulación de eventos | `Boton` - casos 2 y 3; ambas pruebas funcionales |

### Qué quedó fuera y por qué

| Área | Motivo |
|---|---|
| Panel administrativo | Se validó manualmente recorriendo sus trece vistas con un usuario administrador. Automatizar sus formularios habría multiplicado las pruebas sin agregar categorías nuevas a las que ya se cubren. |
| Diseño responsivo | Bootstrap resuelve los puntos de quiebre; se comprobó a mano en escritorio, tablet y teléfono. |
| Rendimiento y disponibilidad (RNF-01, RNF-07) | No se pueden verificar con pruebas de componentes. |

### Cómo reproducir los resultados

```bash
npm install
npx playwright install chromium
npm test
```

Salida esperada:

```
Test Files  4 passed (4)
     Tests  12 passed (12)
```
