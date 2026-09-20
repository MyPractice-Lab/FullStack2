# The Zone - Tienda online de artículos gamer

Sitio web desarrollado para la Evaluación Parcial N° 1 de la asignatura
**DSY1104 Desarrollo Fullstack II**.

## Descripción

Tienda en línea de periféricos gamer construida con HTML5, CSS3 y JavaScript,
sin servidor ni base de datos. Los datos del carrito y del catálogo se guardan
en el navegador mediante `localStorage`.

## Cómo ejecutarlo

1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Instalar la extensión **Live Server**.
3. Clic derecho sobre `index.html` y elegir *Open with Live Server*.

También funciona abriendo `index.html` directamente en el navegador.

## Estructura del proyecto

```
tienda-online/
├── index.html              Portada, destacados y video institucional
├── productos.html          Catálogo con buscador, filtro y ordenamiento
├── detalle-producto.html   Ficha ampliada del producto
├── carrito.html            Carrito, totales, IVA y despacho
├── login.html              Inicio de sesión
├── registro.html           Registro de clientes con regiones y comunas
├── contacto.html           Formulario de contacto
├── nosotros.html           Información del negocio
├── blogs.html              Publicaciones
├── admin-producto.html     Mantención del catálogo
└── assets/
    ├── css/styles.css      Hoja de estilos externa, compartida
    ├── js/productos.js     Datos del catálogo y su presentación
    ├── js/carrito.js       Carrito de compras y menú responsivo
    ├── js/regiones.js      Regiones y comunas de Chile
    ├── js/validaciones.js  Validación de todos los formularios
    └── img/                Imágenes de los productos
```

## Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica de las páginas |
| CSS3 | Presentación, Flexbox, Grid y diseño adaptable |
| JavaScript | Catálogo, carrito y validación de formularios |
| localStorage | Persistencia de datos en el navegador |
| Git y GitHub | Control de versiones y trabajo colaborativo |

## Diseño adaptable

El sitio se adapta a tres tamaños de pantalla mediante media queries:

| Dispositivo | Ancho |
|---|---|
| Escritorio | más de 992 px |
| Tablet | hasta 992 px |
| Teléfono | hasta 600 px |

## Validación de formularios

Los cuatro formularios del sitio se validan con JavaScript antes de enviarse:

- Se impide el envío cuando hay datos incompletos o incorrectos.
- Cada campo con problemas se marca y muestra un mensaje de error propio.
- El foco se lleva automáticamente al primer campo con error.
- Cuando el dominio del correo está mal escrito, se propone la corrección.

## Documentación

La Especificación de Requisitos de Software (ERS) del proyecto está en el
documento *DSY1104 Evaluación Parcial 1 - Anexo 4 ERS - Tienda Online.docx*.

## Equipo

- Maximiliano Provoste
- Patricio Ormazabal
- Basthian Vernal
