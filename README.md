# The Zone - Tienda online de artículos gamer

Aplicación web desarrollada para la asignatura **DSY1104 Desarrollo Fullstack II**.

- **Entrega 1:** sitio en HTML5, CSS3 y JavaScript. Vive en el historial de Git, hasta el
  commit `2824a36`.
- **Entrega 2:** migración del frontend a **React**, con nuevas vistas, panel administrativo
  y pruebas automatizadas.

## Descripción

Tienda en línea de periféricos gamer construida con React sobre Vite. No tiene servidor ni
base de datos: los productos, las categorías, los usuarios, las órdenes, el carrito y la
sesión se guardan en el navegador mediante `localStorage`, siempre a través de los módulos de
`src/data/`.

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Luego abrir la dirección que indica la consola (por defecto http://localhost:5173).

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

### Cuentas de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@thezone.cl` | `Admin123` |
| Cliente | `pedro@example.com` | `Cliente123` |

El panel administrativo está en `/admin` y solo se abre con la cuenta de administrador.

## Pruebas

```bash
npx playwright install chromium   # solo la primera vez
npm test                          # las 12 pruebas
npm run test:unit                 # solo las automáticas (jsdom)
npm run test:funcional            # solo las funcionales (Chromium)
```

| Tipo | Archivos | Qué cubren |
|---|---|---|
| Automáticas | `src/componentes/**/*.test.jsx` | Props, eventos y renderizado condicional de los componentes. |
| Funcionales | `src/test/*.funcional.jsx` | Flujo completo de compra, pago rechazado y validación del registro, en un navegador real. |

El análisis completo está en [`docs/cobertura-testing.md`](docs/cobertura-testing.md).

## Estructura del proyecto

```
tienda-online/
├── index.html                  Punto de entrada de la SPA
├── vite.config.js              Vite + los dos proyectos de prueba
├── public/assets/              Imágenes y video servidos tal cual
├── docs/
│   ├── ERS-v2.md               Especificación de requisitos, revisión 2.0
│   └── cobertura-testing.md    Propuesta y análisis de las pruebas
└── src/
    ├── main.jsx                Monta React, el router y los proveedores
    ├── App.jsx                 Mapa de rutas de la tienda y del admin
    ├── index.css               Paleta propia sobre las variables de Bootstrap
    ├── data/                   Módulos CRUD + persistencia en localStorage
    │   ├── almacenamiento.js   Lectura, escritura y semilla
    │   ├── claves.js           Claves de localStorage, declaradas una sola vez
    │   ├── semillas.js         Datos de ejemplo
    │   └── productos.js, categorias.js, usuarios.js, ordenes.js, carrito.js,
    │       sesion.js, regiones.js, blog.js
    ├── utils/                  Funciones puras: catálogo, totales y validaciones
    ├── contexto/               Estado compartido de carrito y sesión
    ├── hooks/                  useCarrito y useSesion
    ├── componentes/
    │   ├── atomos/             Boton, Precio, Etiqueta, Titulo, Aviso, ImagenProducto
    │   ├── moleculas/          CampoFormulario, TarjetaProducto, FilaCarrito, ResumenTotales...
    │   ├── organismos/         Encabezado, PieDePagina, RejillaProductos, TablaCarrito...
    │   └── plantillas/         PlantillaTienda, PlantillaAdmin, RutaAdmin
    ├── paginas/
    │   ├── tienda/             Las 17 vistas públicas
    │   └── admin/              Las 13 vistas del panel administrativo
    └── test/                   Apoyo y pruebas funcionales
```

## Arquitectura

**Atomic Design.** Los componentes están separados por nivel: los átomos no saben nada del
negocio, las moléculas combinan átomos con un dato concreto, los organismos arman secciones
completas, las plantillas definen la estructura de la página y las páginas conectan todo con
los datos.

**Datos encapsulados.** Ningún componente llama a `localStorage`. Toda lectura y escritura
pasa por `src/data/`, que expone funciones con nombre (`listarProductos`, `crearOrden`,
`actualizarUsuario`). El día que exista un backend, se reescriben esos módulos y los
componentes no cambian.

**Reglas de negocio puras.** Los filtros del catálogo, el cálculo de totales (neto, IVA 19%,
despacho gratis sobre $100.000) y las validaciones de formulario viven en `src/utils/` como
funciones sin estado, lo que permite probarlas sin levantar la interfaz.

**Estado.** El carrito y la sesión viven en contexto; el resto del estado es local al
componente que lo necesita y baja a los hijos por props.

## Tecnologías

| Tecnología | Uso |
|---|---|
| React 19 | Componentes, estado y props |
| Vite | Servidor de desarrollo y empaquetado |
| React Router | Navegación entre vistas sin recargar la página |
| Bootstrap 5 y React-Bootstrap | Diseño responsivo |
| localStorage | Persistencia de datos en el navegador |
| Vitest + Testing Library | Pruebas automáticas sobre jsdom |
| Vitest browser mode + Playwright | Pruebas funcionales en Chromium |
| Git y GitHub | Control de versiones y trabajo colaborativo |

## Equipo

- Maximiliano Provoste
- Patricio Ormazabal
- Basthian Vernal
