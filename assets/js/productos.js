/* ==========================================================================
   The Zone - Catálogo de productos
   Contiene los datos de los productos y las funciones que los muestran
   en la portada, en el catálogo y en la página de detalle.
   ========================================================================== */

// Listado base de la tienda. El administrador puede agregar más desde
// admin-producto.html, y esos quedan guardados en el navegador.
var productosBase = [
    {
        id: 1,
        nombre: "Teclado mecánico Zone K80 RGB",
        categoría: "Teclados",
        precio: 59990,
        imagen: "assets/img/teclado.jpg",
        marca: "Zone",
        garantía: "12 meses",
        descripción: "Teclado mecánico de tamaño completo con switches rojos, retroiluminacion RGB por tecla y estructura de aluminio."
    },
    {
        id: 2,
        nombre: "Mouse gamer Zone M5 Pro",
        categoría: "Mouse",
        precio: 29990,
        imagen: "assets/img/mouse.jpg",
        marca: "Zone",
        garantía: "12 meses",
        descripción: "Mouse de 16000 DPI ajustables, seis botones programables y sensor óptico de alta precision."
    },
    {
        id: 3,
        nombre: "Notebook gamer Zone Raptor 15",
        categoría: "Notebooks",
        precio: 899990,
        imagen: "assets/img/laptop.webp",
        marca: "Zone",
        garantía: "24 meses",
        descripción: "Notebook de 15 pulgadas con pantalla de 144 Hz, 16 GB de memoria RAM y disco sólido de 512 GB."
    }
];

/* Devuelve todos los productos: los base más los que agrego el administrador. */
function obtenerProductos() {
    var guardados = localStorage.getItem("productosTheZone");
    if (guardados === null) {
        return productosBase;
    }
    return JSON.parse(guardados);
}

/* Guarda el listado completo de productos en el navegador. */
function guardarProductos(lista) {
    localStorage.setItem("productosTheZone", JSON.stringify(lista));
}

/* Busca un producto por su identificador. */
function buscarProducto(id) {
    var lista = obtenerProductos();
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].id === id) {
            return lista[i];
        }
    }
    return null;
}

/* Convierte 59990 en "$59.990" */
function formatearPrecio(valor) {
    return "$" + valor.toLocaleString("es-CL");
}

/* Construye el HTML de una tarjeta de producto. */
function crearTarjeta(producto) {
    return '<article class="tarjeta">' +
        '<img src="' + producto.imagen + '" alt="' + producto.nombre + '">' +
        '<div class="tarjeta-cuerpo">' +
        '<span class="tarjeta-categoria">' + producto.categoria + '</span>' +
        '<h3>' + producto.nombre + '</h3>' +
        '<p class="tarjeta-precio">' + formatearPrecio(producto.precio) + '</p>' +
        '<div class="tarjeta-acciones">' +
        '<a class="boton boton-secundario" href="detalle-producto.html?id=' + producto.id + '">Ver</a>' +
        '<button class="boton" type="button" onclick="agregarAlCarrito(' + producto.id + ')">Agregar</button>' +
        '</div></div></article>';
}

/* Pinta una lista de productos dentro del contenedor indicado. */
function pintarProductos(contenedor, lista) {
    if (lista.length === 0) {
        contenedor.innerHTML = '<p class="vacio">No hay productos que coincidan con la búsqueda.</p>';
        return;
    }
    var html = "";
    for (var i = 0; i < lista.length; i++) {
        html += crearTarjeta(lista[i]);
    }
    contenedor.innerHTML = html;
}

/* Aplica los filtros de categoría y de texto del catalogo. */
function filtrarCatalogo() {
    var contenedor = document.getElementById("rejillaCatalogo");
    var categoria = document.getElementById("filtroCategoria").value;
    var texto = document.getElementById("filtroTexto").value.toLowerCase();
    var orden = document.getElementById("filtroOrden").value;

    var lista = obtenerProductos().filter(function (producto) {
        var coincideCategoria = (categoria === "todas" || producto.categoria === categoria);
        var coincideTexto = producto.nombre.toLowerCase().indexOf(texto) !== -1;
        return coincideCategoria && coincideTexto;
    });

    if (orden === "menor") {
        lista.sort(function (a, b) { return a.precio - b.precio; });
    } else if (orden === "mayor") {
        lista.sort(function (a, b) { return b.precio - a.precio; });
    }

    pintarProductos(contenedor, lista);
    document.getElementById("totalResultados").textContent = lista.length;
}

/* Carga las categorías disponibles en el menú desplegable del filtro. */
function cargarCategorias() {
    var selector = document.getElementById("filtroCategoria");
    var lista = obtenerProductos();
    var categorias = [];

    for (var i = 0; i < lista.length; i++) {
        if (categorias.indexOf(lista[i].categoria) === -1) {
            categorias.push(lista[i].categoria);
        }
    }
    categorias.sort();

    for (var j = 0; j < categorias.length; j++) {
        var opcion = document.createElement("option");
        opcion.value = categorias[j];
        opcion.textContent = categorias[j];
        selector.appendChild(opcion);
    }
}

/* Lee el parametro id de la direccion y muestra la ficha del producto. */
function mostrarDetalle() {
    var parametros = new URLSearchParams(window.location.search);
    var id = parseInt(parametros.get("id"), 10);
    var producto = buscarProducto(id);
    var contenedor = document.getElementById("detalleProducto");

    if (producto === null) {
        contenedor.innerHTML = '<p class="vacio">El producto solicitado no existe. ' +
            '<a href="productos.html">Volver al catalogo</a>.</p>';
        return;
    }

    document.title = producto.nombre + " | The Zone";

    contenedor.innerHTML =
        '<img src="' + producto.imagen + '" alt="' + producto.nombre + '">' +
        '<div>' +
        '<span class="tarjeta-categoria">' + producto.categoria + '</span>' +
        '<h1>' + producto.nombre + '</h1>' +
        '<p>' + producto.descripcion + '</p>' +
        '<p class="detalle-precio">' + formatearPrecio(producto.precio) + '</p>' +
        '<table class="detalle-ficha">' +
        '<caption class="ayuda">Ficha técnica del producto</caption>' +
        '<tr><th>Marca</th><td>' + producto.marca + '</td></tr>' +
        '<tr><th>Categoria</th><td>' + producto.categoria + '</td></tr>' +
        '<tr><th>Garantia</th><td>' + producto.garantia + '</td></tr>' +
        '<tr><th>Despacho</th><td>A todo Chile en 3 a 5 días hábiles</td></tr>' +
        '</table>' +
        '<button class="boton boton-bloque" type="button" onclick="agregarAlCarrito(' + producto.id + ')">' +
        'Agregar al carrito</button>' +
        '</div>';
}

/* Arranque: cada página usa solo lo que necesita. */
document.addEventListener("DOMContentLoaded", function () {
    var destacados = document.getElementById("rejillaDestacados");
    if (destacados !== null) {
        pintarProductos(destacados, obtenerProductos().slice(0, 3));
    }

    var catalogo = document.getElementById("rejillaCatalogo");
    if (catalogo !== null) {
        cargarCategorias();
        filtrarCatalogo();
        document.getElementById("filtroCategoria").addEventListener("change", filtrarCatalogo);
        document.getElementById("filtroOrden").addEventListener("change", filtrarCatalogo);
        document.getElementById("filtroTexto").addEventListener("input", filtrarCatalogo);
    }

    if (document.getElementById("detalleProducto") !== null) {
        mostrarDetalle();
    }
});
