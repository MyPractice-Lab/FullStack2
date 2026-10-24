# Especificación de Requisitos de Software (ERS)

## Tienda online "The Zone"

| Campo | Detalle |
|---|---|
| Asignatura | DSY1104 - Desarrollo Fullstack II |
| Evaluación | Parcial N° 2 - Migración a React y pruebas |
| Estándar | IEEE 830 |
| Revisión | 2.0 |
| Fecha | 23-10-2026 |
| Integrantes | Maximiliano Provoste - Patricio Ormazabal - Basthian Vernal |

### Ficha del documento

| Fecha | Revisión | Autor | Modificación |
|---|---|---|---|
| 19-09-2026 | 1.0 | M. Provoste, P. Ormazabal, B. Vernal | Versión inicial del documento. |
| 23-10-2026 | 2.0 | M. Provoste, P. Ormazabal, B. Vernal | Migración del frontend a React, nuevas vistas (categorías, checkout, resultado del pago, ofertas y panel administrativo), persistencia mediante módulos de datos y estrategia de pruebas con Vitest y Chromium. |

---

## 1. Introducción

Este documento contiene la Especificación de Requisitos de Software del sitio web de la
tienda online "The Zone". Está organizado según el estándar IEEE 830 y consta de tres
secciones: introducción, descripción general y requisitos específicos.

Esta revisión 2.0 actualiza la versión 1.0 tras la migración del frontend desde páginas
HTML independientes a una aplicación de una sola página construida con React.

### 1.1. Propósito

Definir de forma clara y completa los requisitos que debe cumplir el sitio web, de modo que
sirva como acuerdo entre el equipo de desarrollo y el negocio, y como base para las
siguientes etapas del proyecto.

El documento está dirigido al equipo de desarrollo, al docente de la asignatura en su rol de
contraparte evaluadora y a los representantes del negocio.

### 1.2. Ámbito del Sistema

El sistema se denomina tienda online "The Zone". Es un sitio web de comercio electrónico
para la venta de artículos gamer: teclados, mouse, notebooks y accesorios.

**El sistema hará lo siguiente:**

- Mostrar un catálogo de productos con su detalle, imagen, stock y precio, con precio de
  oferta cuando corresponda.
- Separar los productos por categorías y ofrecer una vista exclusiva de ofertas.
- Permitir agregar productos a un carrito de compras, modificar las cantidades y revisarlo.
- Llevar al cliente por un proceso de pago (checkout) donde declara sus datos y su dirección
  de entrega, y mostrar el resultado del pago: boleta de compra exitosa o aviso de pago
  rechazado.
- Permitir el registro e inicio de sesión de clientes, y autocompletar sus datos en el
  checkout cuando la sesión está iniciada.
- Ofrecer un formulario de contacto con validación de datos.
- Entregar información del negocio y publicaciones de blog con su vista de detalle.
- Ofrecer un panel administrativo con mantenedores de productos, categorías y usuarios,
  revisión de órdenes con su boleta, listado de productos con stock crítico, reportes de
  venta y edición del perfil.

**El sistema no hará lo siguiente en esta versión:**

- No procesará pagos reales: la respuesta de la pasarela se simula desde el formulario de
  checkout para poder recorrer tanto el camino aprobado como el rechazado.
- No contará con servidor ni base de datos: los datos se manejan en el navegador mediante
  `localStorage`, por lo que no se comparten entre dispositivos.
- No gestionará despachos reales, facturación electrónica ni integración con proveedores.
- No cifra las contraseñas: se almacenan tal cual en el navegador, lo que es aceptable solo
  por tratarse de un prototipo académico sin datos reales.

**Beneficios y objetivos esperados:**

- Centralizar los pedidos que hoy se reciben por WhatsApp y correo electrónico.
- Reducir los pedidos que no se concretan por falta de seguimiento.
- Entregar al negocio una herramienta de administración del catálogo y de las ventas.
- Construir la base sobre la que se conectará el backend en la etapa siguiente.

### 1.3. Definiciones, Acrónimos y Abreviaturas

| Término | Significado |
|---|---|
| ERS | Especificación de Requisitos de Software. |
| SPA | *Single Page Application*: aplicación que se carga una vez y cambia de vista sin recargar la página. |
| React | Librería de JavaScript para construir interfaces a partir de componentes. |
| Componente | Pieza reutilizable de interfaz que recibe datos por props y puede manejar su propio estado. |
| Props | Datos y funciones que un componente recibe desde su componente padre. |
| Estado (*state*) | Datos que un componente guarda y que, al cambiar, provocan que se vuelva a dibujar. |
| Contexto (*context*) | Mecanismo de React para compartir estado entre componentes lejanos sin pasarlo campo por campo. |
| Atomic Design | Metodología que organiza los componentes en átomos, moléculas, organismos, plantillas y páginas. |
| Vite | Herramienta de desarrollo y empaquetado del proyecto. |
| React Router | Librería que resuelve la navegación entre vistas de la SPA. |
| Bootstrap | Framework de CSS utilizado para el diseño responsivo. |
| localStorage | Almacén de texto del navegador donde el sistema guarda productos, usuarios, órdenes, carrito y sesión. |
| CRUD | Crear, leer, actualizar y eliminar: las cuatro operaciones sobre un conjunto de datos. |
| Vitest | Ejecutor de pruebas del proyecto. |
| Chromium | Navegador real donde se ejecutan las pruebas funcionales. |
| jsdom | Simulación del navegador en memoria donde se ejecutan las pruebas automáticas rápidas. |
| Git / GitHub | Sistema de control de versiones y plataforma donde se aloja el repositorio remoto. |

### 1.4. Referencias

| Documento | Origen |
|---|---|
| Evaluación Parcial N° 2 DSY1104 - Anexo 1 Instrucciones | Duoc UC, 2026. |
| ERS Tienda online "The Zone", revisión 1.0 | Equipo de desarrollo, 19-09-2026. |
| IEEE 830-1998, *Recommended Practice for Software Requirements Specifications* | IEEE. |
| Documentación de React | https://react.dev |
| Documentación de Vite y Vitest | https://vite.dev y https://vitest.dev |
| Documentación de Bootstrap 5 | https://getbootstrap.com |

### 1.5. Visión General del Documento

La sección 2 describe el contexto del producto: con qué se relaciona, qué funciones ofrece,
quiénes lo usan y bajo qué restricciones se construye. La sección 3 detalla los requisitos
funcionales y no funcionales, cada uno identificado con un código único. Los requisitos que
provienen de la revisión 1.0 conservan su código original.

---

## 2. Descripción General

### 2.1. Perspectiva del Producto

El sitio web es la capa de presentación de un sistema mayor que se desarrolla por etapas. En
esta segunda etapa el producto sigue siendo independiente —se ejecuta por completo en el
navegador— pero su arquitectura ya está preparada para conectarse a un backend: toda lectura
y escritura de datos pasa por los módulos de `src/data/`, de modo que reemplazar
`localStorage` por llamadas a una API no obliga a tocar los componentes.

| Componente | Relación con el sitio web |
|---|---|
| Base de datos | Almacenará productos, categorías, clientes y órdenes de forma permanente. |
| Servidor de aplicación | Expondrá los datos al sitio web y procesará los pedidos. Reemplazará a los módulos de `src/data/`. |
| Pasarela de pago | Reemplazará la simulación del checkout y entregará el resultado real del pago. |
| Módulo de despacho | Recibirá la dirección de entrega registrada en cada orden. |

### 2.2. Funciones del Producto

| Función | Descripción |
|---|---|
| Catálogo | Listar los productos disponibles con imagen, nombre, categoría, stock y precio. |
| Búsqueda y filtrado | Buscar por nombre, filtrar por categoría y ordenar por precio o nombre. |
| Detalle de producto | Mostrar la ficha ampliada y permitir elegir la cantidad a comprar. |
| Categorías | Agrupar los productos por categoría y mostrar cada una por separado. |
| Ofertas | Reunir en una sola vista los productos con precio rebajado. |
| Carrito de compras | Agregar, modificar cantidades, quitar productos, vaciar el carrito y ver los totales con IVA y despacho. |
| Checkout | Registrar los datos del cliente y la dirección de entrega antes de pagar. |
| Resultado del pago | Mostrar la boleta de la compra exitosa o el aviso del pago rechazado con opción de reintentar. |
| Cuentas de usuario | Registrar clientes nuevos, iniciar y cerrar sesión. |
| Contacto | Recibir consultas mediante un formulario validado. |
| Contenidos | Presentar información del negocio y publicaciones del blog con su detalle. |
| Administración | Mantener productos, categorías y usuarios; revisar órdenes, boletas, stock crítico y reportes. |

### 2.3. Características de los Usuarios

| Perfil | Descripción | Conocimientos requeridos |
|---|---|---|
| Visitante | Persona que navega el sitio sin haber iniciado sesión. Puede ver el catálogo, las categorías, las ofertas, el blog y armar un carrito. | Uso básico de un navegador web. |
| Cliente | Usuario registrado. Además de lo anterior, completa el checkout con sus datos precargados y queda asociado a sus órdenes. | Uso de computador a nivel usuario y experiencia previa en compras por internet. |
| Administrador | Encargado del negocio. Accede al panel administrativo y mantiene productos, categorías, usuarios y revisa las ventas. | Uso de computador a nivel usuario intermedio y conocimiento del catálogo del negocio. |

### 2.4. Restricciones

- El frontend debe desarrollarse con React sobre Vite, y el diseño responsivo debe apoyarse
  en Bootstrap.
- Los componentes deben organizarse siguiendo Atomic Design y cumplir el principio de
  responsabilidad única.
- La persistencia debe resolverse en el navegador con `localStorage`, encapsulada en módulos
  de datos: ningún componente puede leer o escribir el almacenamiento directamente.
- Las validaciones de formularios deben implementarse en JavaScript, en funciones puras
  reutilizables.
- Las pruebas deben ejecutarse con Vitest: las automáticas sobre jsdom y las funcionales
  sobre Chromium.
- El sitio debe funcionar en las versiones actuales de Chrome, Firefox y Edge.
- El proyecto debe versionarse en un repositorio Git alojado en GitHub.
- El equipo de desarrollo tiene un máximo de tres integrantes.
- No se dispone de servidor ni base de datos, por lo que no hay persistencia entre
  dispositivos ni entre navegadores.

### 2.5. Suposiciones y Dependencias

- Se asume que los usuarios acceden desde un dispositivo con conexión a internet y un
  navegador actualizado con `localStorage` habilitado.
- Se asume que el catálogo del negocio se mantiene estable durante el desarrollo.
- El sistema depende de las librerías React, React Router y Bootstrap, instaladas como
  dependencias del proyecto y empaquetadas junto al sitio: ya no se cargan desde un CDN, por
  lo que una caída del CDN no afecta la presentación.
- Si en el futuro se incorpora un servidor o una base de datos, los módulos de `src/data/`
  deberán reescribirse para consumir la API; los componentes no deberían requerir cambios.

### 2.6. Requisitos Futuros

- Conexión a una base de datos y a un servidor de aplicación.
- Integración con una pasarela de pago real.
- Cifrado de contraseñas y manejo de sesiones mediante tokens.
- Seguimiento del estado de cada pedido por parte del cliente.
- Reportes de venta con gráficos y exportación.
- Carga de imágenes de producto desde el panel administrativo.

---

## 3. Requisitos Específicos

### 3.1. Requisitos comunes de las interfaces

#### 3.1.1. Interfaces de usuario

La interfaz es una aplicación de una sola página. Dos plantillas definen la estructura: la
plantilla de la tienda (cabecera con buscador y carrito, menú de navegación, contenido y pie
de página) y la plantilla de administración (cabecera, menú lateral y contenido).

**Vistas públicas**

| Ruta | Propósito |
|---|---|
| `/` | Portada con categorías, destacados, video institucional y beneficios. |
| `/productos` | Catálogo con buscador, filtro por categoría y ordenamiento. |
| `/producto/:id` | Ficha ampliada del producto y selección de cantidad. |
| `/categorias` | Listado de categorías y sus productos. |
| `/categorias/:slug` | Productos de una categoría específica. |
| `/ofertas` | Productos con precio rebajado. |
| `/carrito` | Revisión del carrito y totales. |
| `/checkout` | Datos del cliente y dirección de entrega. |
| `/pago/exitoso/:codigo` | Boleta de la compra realizada. |
| `/pago/rechazado/:codigo` | Aviso de pago rechazado con opción de reintentar. |
| `/login` | Inicio de sesión. |
| `/registro` | Registro de nuevos clientes. |
| `/nosotros` | Información del negocio. |
| `/blog` y `/blog/:slug` | Publicaciones y su detalle. |
| `/contacto` | Formulario de contacto. |

**Vistas de administración** (todas bajo `/admin`, exclusivas del perfil administrador)

| Ruta | Propósito |
|---|---|
| `/admin` | Dashboard con métricas de ventas, inventario y usuarios. |
| `/admin/ordenes` y `/admin/ordenes/:codigo` | Listado de órdenes y boleta de cada una. |
| `/admin/productos` | Mantenedor del catálogo. |
| `/admin/productos/nuevo` y `/admin/productos/:id` | Alta y edición de productos. |
| `/admin/productos/criticos` | Productos con stock bajo el umbral configurable. |
| `/admin/categorias`, `/admin/categorias/nueva`, `/admin/categorias/:id` | Mantenedor de categorías. |
| `/admin/usuarios`, `/admin/usuarios/nuevo`, `/admin/usuarios/:id` | Mantenedor de usuarios. |
| `/admin/usuarios/:id/compras` | Historial de compras de un usuario. |
| `/admin/reportes` | Ventas, ticket promedio, productos más vendidos e inventario por categoría. |
| `/admin/perfil` | Edición de los datos de la cuenta conectada. |

El diseño debe adaptarse a tres tamaños de pantalla: teléfono, tablet y equipo de escritorio.

#### 3.1.2. Interfaces de hardware

El sistema no requiere hardware especial. Funciona en computadores de escritorio, notebooks,
tablets y teléfonos con conexión a internet.

#### 3.1.3. Interfaces de software

El sitio se ejecuta sobre navegadores web actuales. Para su desarrollo se utilizan Node.js,
Vite, Visual Studio Code y Git. Las pruebas funcionales requieren el navegador Chromium que
instala Playwright.

#### 3.1.4. Interfaces de comunicación

La comunicación entre el navegador y los recursos del sitio se realiza mediante HTTP y
HTTPS. El almacenamiento de datos ocurre localmente en el navegador en formato JSON. En la
etapa siguiente ese intercambio de JSON se hará contra un servidor.

### 3.2. Requisitos funcionales

#### Requisitos heredados de la revisión 1.0

| Código | Requisito | Descripción | Prioridad |
|---|---|---|---|
| RF-01 | Estructura semántica | Las vistas deben construirse con etiquetas semánticas de HTML5: `header`, `nav`, `main`, `section`, `article` y `footer`. | Alta |
| RF-02 | Navegación | Todas las vistas deben alcanzarse desde un menú común mediante React Router, sin recargar la página. | Alta |
| RF-03 | Catálogo de productos | El sistema debe mostrar el listado de productos con imagen, nombre, categoría, precio y stock. | Alta |
| RF-04 | Detalle de producto | El sistema debe mostrar la ficha ampliada del producto seleccionado. | Alta |
| RF-05 | Carrito de compras | El usuario debe poder agregar y quitar productos del carrito y ver el total. | Alta |
| RF-06 | Registro de clientes | El sistema debe permitir registrar un cliente solicitando nombre, correo, contraseña, región y comuna. | Alta |
| RF-07 | Inicio de sesión | El sistema debe permitir iniciar sesión con correo y contraseña, y cerrarla. | Alta |
| RF-08 | Formulario de contacto | El sistema debe permitir enviar consultas indicando nombre, correo, motivo y mensaje. | Alta |
| RF-09 | Validación de formularios | JavaScript debe validar los formularios antes de enviarlos e impedir el envío de datos incompletos o incorrectos. | Alta |
| RF-10 | Mensajes de error | El sistema debe mostrar mensajes de error personalizados, indicando qué campo tiene el problema y cuál es. | Alta |
| RF-11 | Ayudas al usuario | Los campos deben contar con etiqueta asociada, texto de ayuda y autocompletado cuando corresponda. | Media |
| RF-12 | Video embebido | El sitio debe incluir al menos un video embebido relacionado con los productos. | Media |
| RF-13 | Administración de productos | El administrador debe poder agregar, modificar y eliminar productos del catálogo. | Alta |
| RF-14 | Búsqueda y filtrado | El usuario debe poder buscar productos por nombre, filtrar por categoría y ordenar por precio. | Media |
| RF-15 | Pie de página | Todas las vistas deben incluir un pie de página con datos de contacto y el año en curso. | Baja |

#### Requisitos nuevos de la revisión 2.0

| Código | Requisito | Descripción | Prioridad |
|---|---|---|---|
| RF-16 | Componentes reutilizables | La interfaz debe construirse con componentes React organizados en átomos, moléculas, organismos, plantillas y páginas. Cada componente debe tener una única responsabilidad, recibir sus datos por props y manejar estado solo cuando lo necesite. | Alta |
| RF-17 | Módulos de datos | Cada entidad (productos, categorías, usuarios, órdenes, carrito y sesión) debe tener un módulo propio que exponga sus operaciones CRUD y sea el único que acceda al almacenamiento. | Alta |
| RF-18 | Persistencia en el navegador | Los datos deben guardarse en `localStorage` y sobrevivir al cierre del navegador. La carga inicial de ejemplo debe aplicarse solo cuando la clave no existe, de modo que una tabla vaciada a propósito permanezca vacía. | Alta |
| RF-19 | Estado compartido | El carrito y la sesión deben vivir en un contexto de React, de modo que la cabecera, el carrito y el checkout muestren siempre la misma información. | Alta |
| RF-20 | Vista de categorías | El sistema debe ofrecer una vista con todas las categorías y una vista por categoría individual. | Alta |
| RF-21 | Vista de ofertas | El sistema debe reunir en una vista los productos cuyo precio de oferta sea menor al precio normal, indicando el porcentaje de descuento. | Media |
| RF-22 | Cantidades en el carrito | El usuario debe poder modificar la cantidad de cada línea y vaciar el carrito completo. Una cantidad menor que uno debe eliminar la línea. | Alta |
| RF-23 | Cálculo de totales | El sistema debe calcular neto, IVA (19%), despacho y total. El despacho es gratis sobre $100.000 y cuesta $4.990 bajo ese monto. | Alta |
| RF-24 | Checkout | El sistema debe solicitar nombre, apellidos, correo, calle, departamento opcional, región, comuna e indicaciones de entrega antes de pagar, y validar los campos obligatorios. | Alta |
| RF-25 | Datos precargados | Si el usuario tiene la sesión iniciada, el checkout debe completar automáticamente sus datos y permitir modificarlos. | Media |
| RF-26 | Resultado del pago | El sistema debe registrar la orden y mostrar la vista de compra exitosa —con código de orden, detalle y total pagado— o la de pago rechazado, con opción de reintentar. | Alta |
| RF-27 | Descuento de stock | Una compra pagada debe descontar las unidades vendidas del stock de cada producto. | Alta |
| RF-28 | Órdenes y boletas | El administrador debe poder revisar todas las órdenes con su estado y abrir la boleta de cada una. | Alta |
| RF-29 | Administración de categorías | El administrador debe poder crear, editar y eliminar categorías. No debe poder eliminar una categoría con productos asociados. | Media |
| RF-30 | Administración de usuarios | El administrador debe poder crear, editar, activar y eliminar cuentas, y asignarles el rol de cliente o administrador. No debe poder eliminar la cuenta con la que está conectado. | Media |
| RF-31 | Historial de compras | El administrador debe poder ver las órdenes asociadas a un usuario y el total comprado. | Media |
| RF-32 | Stock crítico | El sistema debe listar los productos cuyo stock sea igual o menor a un umbral configurable, ordenados de menor a mayor. | Media |
| RF-33 | Reportes | El sistema debe mostrar el total vendido, el ticket promedio, los pagos rechazados, los productos más vendidos y el inventario por categoría. | Media |
| RF-34 | Perfil | El usuario administrador debe poder actualizar su nombre, correo y dirección desde el panel. | Baja |
| RF-35 | Control de acceso por rol | Las rutas bajo `/admin` deben redirigir al login cuando no hay sesión y a la tienda cuando la cuenta no es de administrador. | Alta |
| RF-36 | Pruebas automáticas | El proyecto debe incluir pruebas que verifiquen el renderizado de los componentes, las props que reciben y el renderizado condicional. | Alta |
| RF-37 | Pruebas funcionales | El proyecto debe incluir pruebas que recorran los flujos completos en un navegador real: compra exitosa, pago rechazado y validación del registro. | Alta |

### 3.3. Requisitos no funcionales

#### 3.3.1. Rendimiento

- **RNF-01:** Cada vista debe quedar utilizable en menos de tres segundos con una conexión
  doméstica.
- **RNF-02:** Las imágenes deben estar optimizadas para no superar los 300 KB cada una y
  cargarse de forma diferida fuera de la pantalla visible.

#### 3.3.2. Seguridad

- **RNF-03:** Las contraseñas no deben mostrarse en pantalla al escribirlas.
- **RNF-04:** Las vistas de administración solo deben estar accesibles para el perfil
  administrador.
- **RNF-13:** La contraseña no debe guardarse en el objeto de sesión que queda en el
  navegador.

#### 3.3.3. Fiabilidad

- **RNF-05:** Ningún error de validación debe interrumpir la navegación del sitio.
- **RNF-06:** Los enlaces del menú deben funcionar en todas las vistas sin excepción.
- **RNF-14:** Si el contenido guardado en `localStorage` está corrupto, el sistema debe
  descartarlo y continuar con los datos de ejemplo en lugar de fallar.

#### 3.3.4. Disponibilidad

- **RNF-07:** El sitio debe estar disponible las 24 horas una vez publicado.
- **RNF-08:** El sitio debe seguir siendo navegable sin depender de servicios externos: todas
  las librerías viajan empaquetadas con el sitio.

#### 3.3.5. Mantenibilidad

- **RNF-09:** Los estilos propios deben concentrarse en una única hoja (`src/index.css`), que
  redefine las variables de Bootstrap. No se permiten hojas de estilo por componente ni
  estilos en línea salvo ajustes puntuales de ancho.
- **RNF-10:** El código debe usar nombres descriptivos en español y componentes de
  responsabilidad única. La documentación del proyecto vive en `docs/` y en el README, no
  dentro del código.
- **RNF-15:** Las reglas de negocio (filtros, totales y validaciones) deben estar en
  funciones puras, separadas de los componentes y del almacenamiento, para poder probarlas
  sin levantar la interfaz.

#### 3.3.6. Portabilidad

- **RNF-11:** El sitio debe verse correctamente en Chrome, Firefox y Edge en sus versiones
  actuales.
- **RNF-12:** El sitio debe adaptarse a pantallas de teléfono, tablet y escritorio.

### 3.4. Otros Requisitos

- **RO-01:** El proyecto debe mantenerse en un repositorio Git alojado en GitHub.
- **RO-02:** Los commits deben tener mensajes claros que describan el cambio realizado.
- **RO-03:** Cada integrante del equipo debe registrar sus propios aportes en el repositorio.
- **RO-04:** Los conflictos entre versiones deben resolverse antes de integrar los cambios.
- **RO-05:** El desarrollo de la entrega 2 debe realizarse en la rama `entrega-2` y
  fusionarse a `main` una vez validado.

---

## 4. Trazabilidad entre el anexo de la evaluación y el sistema

| Requisito del anexo | Dónde se cumple |
|---|---|
| Migración de HTML a React con componentes reutilizables | `src/componentes/` y `src/paginas/`; las páginas de la entrega 1 quedan en el historial de Git hasta el commit `2824a36`. |
| Cada componente maneja su propio estado y props | Los formularios y los filtros manejan estado local; el carrito y la sesión usan contexto (RF-16, RF-19). |
| Archivo de datos en JavaScript con operaciones CRUD | `src/data/productos.js`, `categorias.js`, `usuarios.js`, `ordenes.js` (RF-17). |
| Integración de persistencia | `src/data/almacenamiento.js` y `claves.js` (RF-18). |
| Diseño responsivo con Bootstrap | `src/index.css` y los componentes de React-Bootstrap (RNF-12). |
| Vistas adicionales | Categorías, ofertas, checkout, resultado del pago y panel administrativo (RF-20 a RF-35). |
| Interactividad mejorada | Buscador en la cabecera, filtros del catálogo, cantidades del carrito y formularios validados (RF-14, RF-22, RF-24). |
| Configuración del entorno de pruebas | `vite.config.js`, proyectos `unitarias` y `funcionales`. |
| Desarrollo de pruebas | `src/componentes/**/*.test.jsx` y `src/test/*.funcional.jsx`; el análisis está en `docs/cobertura-testing.md`. |
