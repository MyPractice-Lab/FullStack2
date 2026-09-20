/* ==========================================================================
   The Zone - Carrito de compras
   El carrito se guarda en el navegador con localStorage, por lo que se
   mantiene aunque el usuario cierre la página.
   ========================================================================== */

/* Lee el carrito guardado. Devuelve una lista vacia si todavia no existe. */
function obtenerCarrito() {
    var guardado = localStorage.getItem("carritoTheZone");
    if (guardado === null) {
        return [];
    }
    return JSON.parse(guardado);
}

/* Guarda el carrito y refresca el contador de la cabecera. */
function guardarCarrito(carrito) {
    localStorage.setItem("carritoTheZone", JSON.stringify(carrito));
    actualizarContador();
}

/* Suma las unidades del carrito y las muestra junto al boton de la cabecera. */
function actualizarContador() {
    var contador = document.getElementById("contadorCarrito");
    if (contador === null) {
        return;
    }
    var carrito = obtenerCarrito();
    var total = 0;
    for (var i = 0; i < carrito.length; i++) {
        total += carrito[i].cantidad;
    }
    contador.textContent = total;
}

/* Agrega un producto. Si ya estaba, solo aumenta la cantidad. */
function agregarAlCarrito(id) {
    var carrito = obtenerCarrito();
    var encontrado = false;

    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
            carrito[i].cantidad = carrito[i].cantidad + 1;
            encontrado = true;
        }
    }

    if (encontrado === false) {
        carrito.push({ id: id, cantidad: 1 });
    }

    guardarCarrito(carrito);
    mostrarAvisoCarrito();

    if (document.getElementById("cuerpoCarrito") !== null) {
        pintarCarrito();
    }
}

/* Quita por completo un producto del carrito. */
function quitarDelCarrito(id) {
    var carrito = obtenerCarrito().filter(function (linea) {
        return linea.id !== id;
    });
    guardarCarrito(carrito);
    pintarCarrito();
}

/* Cambia la cantidad de una linea. Si baja de 1, se elimina la linea. */
function cambiarCantidad(id, cantidad) {
    var nueva = parseInt(cantidad, 10);

    if (isNaN(nueva) === true || nueva < 1) {
        quitarDelCarrito(id);
        return;
    }

    var carrito = obtenerCarrito();
    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
            carrito[i].cantidad = nueva;
        }
    }
    guardarCarrito(carrito);
    pintarCarrito();
}

/* Vacia el carrito completo. */
function vaciarCarrito() {
    guardarCarrito([]);
    pintarCarrito();
}

/* Muestra un aviso breve al agregar un producto. */
function mostrarAvisoCarrito() {
    var aviso = document.getElementById("avisoCarrito");
    if (aviso === null) {
        return;
    }
    aviso.textContent = "Producto agregado al carrito.";
    aviso.className = "aviso aviso-exito visible";

    setTimeout(function () {
        aviso.className = "aviso aviso-exito";
    }, 2500);
}

/* Dibuja la tabla del carrito y calcula los totales. */
function pintarCarrito() {
    var cuerpo = document.getElementById("cuerpoCarrito");
    if (cuerpo === null) {
        return;
    }

    var carrito = obtenerCarrito();
    var tabla = document.getElementById("tablaCarrito");
    var resumen = document.getElementById("resumenCarrito");
    var mensajeVacio = document.getElementById("carritoVacio");

    if (carrito.length === 0) {
        tabla.style.display = "none";
        resumen.style.display = "none";
        mensajeVacio.style.display = "block";
        return;
    }

    tabla.style.display = "table";
    resumen.style.display = "block";
    mensajeVacio.style.display = "none";

    var html = "";
    var neto = 0;

    for (var i = 0; i < carrito.length; i++) {
        var producto = buscarProducto(carrito[i].id);
        if (producto === null) {
            continue;
        }

        var subtotal = producto.precio * carrito[i].cantidad;
        neto += subtotal;

        html += "<tr>" +
            '<td><img src="' + producto.imagen + '" alt="' + producto.nombre + '"></td>' +
            "<td>" + producto.nombre + "</td>" +
            "<td>" + formatearPrecio(producto.precio) + "</td>" +
            '<td><input class="cantidad" type="number" min="1" value="' + carrito[i].cantidad +
            '" aria-label="Cantidad de ' + producto.nombre + '" ' +
            'onchange="cambiarCantidad(' + producto.id + ', this.value)"></td>' +
            "<td>" + formatearPrecio(subtotal) + "</td>" +
            '<td><button class="boton boton-peligro" type="button" ' +
            'onclick="quitarDelCarrito(' + producto.id + ')">Quitar</button></td>' +
            "</tr>";
    }

    cuerpo.innerHTML = html;

    // El precio de venta ya incluye IVA, por eso se calcula hacia atras.
    var iva = Math.round(neto - (neto / 1.19));
    var despacho = neto > 100000 ? 0 : 4990;
    var total = neto + despacho;

    document.getElementById("carritoNeto").textContent = formatearPrecio(neto - iva);
    document.getElementById("carritoIva").textContent = formatearPrecio(iva);
    document.getElementById("carritoDespacho").textContent =
        despacho === 0 ? "Gratis" : formatearPrecio(despacho);
    document.getElementById("carritoTotal").textContent = formatearPrecio(total);
}

/* Confirma el pedido y deja el carrito limpio. */
function confirmarPedido() {
    var aviso = document.getElementById("avisoPedido");
    aviso.textContent = "Pedido registrado correctamente. Te contactaremos para coordinar el despacho.";
    aviso.className = "aviso aviso-exito visible";
    vaciarCarrito();
}

/* Abre y cierra el menú en pantallas pequenas. */
function alternarMenu() {
    var navegacion = document.getElementById("navegacion");
    var boton = document.getElementById("menuBoton");
    var abierto = navegacion.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", abierto);
}

document.addEventListener("DOMContentLoaded", function () {
    actualizarContador();
    pintarCarrito();

    var boton = document.getElementById("menuBoton");
    if (boton !== null) {
        boton.addEventListener("click", alternarMenu);
    }
});
