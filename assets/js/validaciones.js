/* ==========================================================================
   The Zone - Validacion de formularios
   Revisa los datos antes de enviarlos, marca el campo con problemas,
   explica el error con un mensaje propio y propone una correccion
   cuando el error es un error de escritura conocido.
   ========================================================================== */

// Dominios de correo mal escritos que se corrigen con más frecuencia.
var correccionesDominio = {
    "gmail.co": "gmail.com",
    "gmial.com": "gmail.com",
    "gmai.com": "gmail.com",
    "gamil.com": "gmail.com",
    "hotmial.com": "hotmail.com",
    "hotmai.com": "hotmail.com",
    "hotmail.co": "hotmail.com",
    "outlok.com": "outlook.com",
    "yaho.com": "yahoo.com",
    "duc.cl": "duocuc.cl",
    "duocuc.com": "duocuc.cl"
};

/* Marca un campo como incorrecto y escribe el motivo debajo. */
function marcarError(idCampo, mensaje) {
    var campo = document.getElementById(idCampo);
    var contenedor = campo.closest(".campo");
    var error = document.getElementById("error-" + idCampo);

    contenedor.classList.remove("correcto");
    contenedor.classList.add("con-error");
    error.textContent = mensaje;
    campo.setAttribute("aria-invalid", "true");
}

/* Marca un campo como correcto y borra el mensaje de error. */
function marcarCorrecto(idCampo) {
    var campo = document.getElementById(idCampo);
    var contenedor = campo.closest(".campo");
    var error = document.getElementById("error-" + idCampo);

    contenedor.classList.remove("con-error");
    contenedor.classList.add("correcto");
    error.textContent = "";
    campo.setAttribute("aria-invalid", "false");
}

/* Deja el campo en su estado inicial. */
function limpiarCampo(idCampo) {
    var campo = document.getElementById(idCampo);
    var contenedor = campo.closest(".campo");
    contenedor.classList.remove("con-error");
    contenedor.classList.remove("correcto");
    document.getElementById("error-" + idCampo).textContent = "";
}

/* Comprueba que el correo tenga la forma nombre@dominio.extension */
function correoValido(valor) {
    var patron = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    return patron.test(valor);
}

/* Si el dominio esta mal escrito, ofrece la correccion como un enlace. */
function revisarSugerenciaCorreo(idCampo) {
    var campo = document.getElementById(idCampo);
    var sugerencia = document.getElementById("sugerencia-" + idCampo);

    if (sugerencia === null) {
        return;
    }

    var partes = campo.value.split("@");
    if (partes.length !== 2) {
        sugerencia.classList.remove("visible");
        return;
    }

    var dominio = partes[1].toLowerCase();
    var correccion = correccionesDominio[dominio];

    if (correccion === undefined) {
        sugerencia.classList.remove("visible");
        return;
    }

    var propuesta = partes[0] + "@" + correccion;
    sugerencia.innerHTML = 'Quizas quisiste escribir <button type="button">' + propuesta + "</button>";
    sugerencia.classList.add("visible");

    sugerencia.querySelector("button").addEventListener("click", function () {
        campo.value = propuesta;
        sugerencia.classList.remove("visible");
        marcarCorrecto(idCampo);
    });
}

/* Muestra el resumen del resultado en la parte superior del formulario. */
function mostrarResumen(idAviso, mensaje, correcto) {
    var aviso = document.getElementById(idAviso);
    aviso.textContent = mensaje;
    aviso.className = correcto ? "aviso aviso-exito visible" : "aviso aviso-error visible";
}

/* Lleva el foco al primer campo con problemas. */
function enfocarPrimerError(campos) {
    for (var i = 0; i < campos.length; i++) {
        var contenedor = document.getElementById(campos[i]).closest(".campo");
        if (contenedor.classList.contains("con-error")) {
            document.getElementById(campos[i]).focus();
            return;
        }
    }
}

/* ==========================================================================
   Formulario de contacto
   ========================================================================== */
function validarContacto(evento) {
    evento.preventDefault();
    var valido = true;

    var nombre = document.getElementById("nombre").value.trim();
    if (nombre === "") {
        marcarError("nombre", "El nombre es obligatorio.");
        válido = false;
    } else if (nombre.length < 3) {
        marcarError("nombre", "El nombre debe tener al menos 3 letras. Escribiste " + nombre.length + ".");
        válido = false;
    } else {
        marcarCorrecto("nombre");
    }

    var correo = document.getElementById("correo").value.trim();
    if (correo === "") {
        marcarError("correo", "El correo es obligatorio para poder responderte.");
        válido = false;
    } else if (correoValido(correo) === false) {
        marcarError("correo", "El correo no tiene un formato valido. Debe ser parecido a nombre@dominio.cl");
        válido = false;
    } else {
        marcarCorrecto("correo");
    }
    revisarSugerenciaCorreo("correo");

    var asunto = document.getElementById("asunto").value;
    if (asunto === "") {
        marcarError("asunto", "Selecciona el motivo de tu consulta.");
        válido = false;
    } else {
        marcarCorrecto("asunto");
    }

    var mensaje = document.getElementById("mensaje").value.trim();
    if (mensaje === "") {
        marcarError("mensaje", "Escribe tu consulta antes de enviar.");
        válido = false;
    } else if (mensaje.length < 10) {
        marcarError("mensaje", "Cuentanos un poco más: faltan " + (10 - mensaje.length) + " caracteres.");
        válido = false;
    } else {
        marcarCorrecto("mensaje");
    }

    if (valido === false) {
        mostrarResumen("avisoContacto", "Revisa los campos marcados en rojo antes de enviar.", false);
        enfocarPrimerError(["nombre", "correo", "asunto", "mensaje"]);
        return;
    }

    mostrarResumen("avisoContacto", "Mensaje enviado. Te responderemos dentro de 24 horas hábiles.", true);
    document.getElementById("formularioContacto").reset();
    limpiarCampo("nombre");
    limpiarCampo("correo");
    limpiarCampo("asunto");
    limpiarCampo("mensaje");
}

/* ==========================================================================
   Formulario de registro
   ========================================================================== */
function validarRegistro(evento) {
    evento.preventDefault();
    var valido = true;

    var nombre = document.getElementById("nombreCompleto").value.trim();
    if (nombre === "") {
        marcarError("nombreCompleto", "El nombre completo es obligatorio.");
        válido = false;
    } else if (nombre.indexOf(" ") === -1) {
        marcarError("nombreCompleto", "Escribe nombre y apellido separados por un espacio.");
        válido = false;
    } else {
        marcarCorrecto("nombreCompleto");
    }

    var correo = document.getElementById("correoRegistro").value.trim();
    if (correo === "") {
        marcarError("correoRegistro", "El correo es obligatorio.");
        válido = false;
    } else if (correoValido(correo) === false) {
        marcarError("correoRegistro", "El correo no tiene un formato valido. Debe ser parecido a nombre@dominio.cl");
        válido = false;
    } else {
        marcarCorrecto("correoRegistro");
    }
    revisarSugerenciaCorreo("correoRegistro");

    var clave = document.getElementById("clave").value;
    if (clave === "") {
        marcarError("clave", "La contraseña es obligatoria.");
        válido = false;
    } else if (clave.length < 8) {
        marcarError("clave", "La contraseña debe tener al menos 8 caracteres. Escribiste " + clave.length + ".");
        válido = false;
    } else if (/[0-9]/.test(clave) === false) {
        marcarError("clave", "La contraseña debe incluir al menos un número.");
        válido = false;
    } else if (/[A-Z]/.test(clave) === false) {
        marcarError("clave", "La contraseña debe incluir al menos una letra mayúscula.");
        válido = false;
    } else {
        marcarCorrecto("clave");
    }

    var repetir = document.getElementById("repetirClave").value;
    if (repetir === "") {
        marcarError("repetirClave", "Repite la contraseña para confirmarla.");
        válido = false;
    } else if (repetir !== clave) {
        marcarError("repetirClave", "Las contraseñas no coinciden.");
        válido = false;
    } else {
        marcarCorrecto("repetirClave");
    }

    var region = document.getElementById("region").value;
    if (region === "") {
        marcarError("region", "Selecciona tu región para calcular el despacho.");
        válido = false;
    } else {
        marcarCorrecto("region");
    }

    var comuna = document.getElementById("comuna").value;
    if (comuna === "") {
        marcarError("comuna", "Selecciona tu comuna.");
        válido = false;
    } else {
        marcarCorrecto("comuna");
    }

    var terminos = document.getElementById("terminos");
    if (terminos.checked === false) {
        marcarError("terminos", "Debes aceptar los términos y condiciones para crear la cuenta.");
        válido = false;
    } else {
        marcarCorrecto("terminos");
    }

    if (valido === false) {
        mostrarResumen("avisoRegistro", "No pudimos crear la cuenta. Revisa los campos marcados en rojo.", false);
        enfocarPrimerError(["nombreCompleto", "correoRegistro", "clave", "repetirClave", "region", "comuna", "terminos"]);
        return;
    }

    mostrarResumen("avisoRegistro", "Cuenta creada correctamente. Ya puedes iniciar sesión.", true);
    document.getElementById("formularioRegistro").reset();
}

/* ==========================================================================
   Formulario de inicio de sesión
   ========================================================================== */
function validarLogin(evento) {
    evento.preventDefault();
    var valido = true;

    var correo = document.getElementById("correoLogin").value.trim();
    if (correo === "") {
        marcarError("correoLogin", "Ingresa tu correo.");
        válido = false;
    } else if (correoValido(correo) === false) {
        marcarError("correoLogin", "El correo no tiene un formato valido.");
        válido = false;
    } else {
        marcarCorrecto("correoLogin");
    }
    revisarSugerenciaCorreo("correoLogin");

    var clave = document.getElementById("claveLogin").value;
    if (clave === "") {
        marcarError("claveLogin", "Ingresa tu contraseña.");
        válido = false;
    } else {
        marcarCorrecto("claveLogin");
    }

    if (valido === false) {
        mostrarResumen("avisoLogin", "No pudimos iniciar sesión. Revisa los datos ingresados.", false);
        enfocarPrimerError(["correoLogin", "claveLogin"]);
        return;
    }

    mostrarResumen("avisoLogin", "Sesión iniciada correctamente.", true);
}

/* ==========================================================================
   Administración de productos
   ========================================================================== */
function validarProducto(evento) {
    evento.preventDefault();
    var valido = true;

    var nombre = document.getElementById("nombreProducto").value.trim();
    if (nombre.length < 5) {
        marcarError("nombreProducto", "El nombre del producto debe tener al menos 5 caracteres.");
        válido = false;
    } else {
        marcarCorrecto("nombreProducto");
    }

    var categoria = document.getElementById("categoriaProducto").value.trim();
    if (categoria === "") {
        marcarError("categoriaProducto", "Indica la categoría del producto.");
        válido = false;
    } else {
        marcarCorrecto("categoriaProducto");
    }

    var precio = document.getElementById("precioProducto").value;
    if (precio === "") {
        marcarError("precioProducto", "El precio es obligatorio.");
        válido = false;
    } else if (isNaN(precio) === true) {
        marcarError("precioProducto", "El precio debe ser un número, sin puntos ni símbolos.");
        válido = false;
    } else if (Number(precio) <= 0) {
        marcarError("precioProducto", "El precio debe ser mayor que cero.");
        válido = false;
    } else {
        marcarCorrecto("precioProducto");
    }

    var descripcion = document.getElementById("descripcionProducto").value.trim();
    if (descripcion.length < 20) {
        marcarError("descripcionProducto",
            "La descripción debe tener al menos 20 caracteres. Escribiste " + descripcion.length + ".");
        válido = false;
    } else {
        marcarCorrecto("descripcionProducto");
    }

    if (valido === false) {
        mostrarResumen("avisoProducto", "No se pudo guardar el producto. Revisa los campos marcados.", false);
        enfocarPrimerError(["nombreProducto", "categoriaProducto", "precioProducto", "descripcionProducto"]);
        return;
    }

    guardarProductoNuevo(nombre, categoria, Number(precio), descripcion);
}

/* Agrega el producto al listado y actualiza la tabla de administración. */
function guardarProductoNuevo(nombre, categoria, precio, descripcion) {
    var lista = obtenerProductos();
    var mayorId = 0;

    for (var i = 0; i < lista.length; i++) {
        if (lista[i].id > mayorId) {
            mayorId = lista[i].id;
        }
    }

    lista.push({
        id: mayorId + 1,
        nombre: nombre,
        categoría: categoria,
        precio: precio,
        imagen: "assets/img/teclado.jpg",
        marca: "Zone",
        garantía: "12 meses",
        descripción: descripción
    });

    guardarProductos(lista);
    mostrarResumen("avisoProducto", "Producto guardado correctamente.", true);
    document.getElementById("formularioProducto").reset();
    pintarTablaAdmin();
}

/* Elimina un producto del listado. */
function eliminarProducto(id) {
    var lista = obtenerProductos().filter(function (producto) {
        return producto.id !== id;
    });
    guardarProductos(lista);
    mostrarResumen("avisoProducto", "Producto eliminado del catalogo.", true);
    pintarTablaAdmin();
}

/* Restaura el catálogo original. */
function restaurarCatalogo() {
    localStorage.removeItem("productosTheZone");
    mostrarResumen("avisoProducto", "Catálogo restaurado a su estado original.", true);
    pintarTablaAdmin();
}

/* Dibuja la tabla de productos de la página de administración. */
function pintarTablaAdmin() {
    var cuerpo = document.getElementById("cuerpoAdmin");
    if (cuerpo === null) {
        return;
    }

    var lista = obtenerProductos();
    var html = "";

    for (var i = 0; i < lista.length; i++) {
        html += "<tr>" +
            "<td>" + lista[i].id + "</td>" +
            "<td>" + lista[i].nombre + "</td>" +
            "<td>" + lista[i].categoria + "</td>" +
            "<td>" + formatearPrecio(lista[i].precio) + "</td>" +
            '<td><button class="boton boton-peligro" type="button" ' +
            'onclick="eliminarProducto(' + lista[i].id + ')">Eliminar</button></td>' +
            "</tr>";
    }

    cuerpo.innerHTML = html;
}

/* ==========================================================================
   Conexion de los formularios de cada página
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function () {
    var contacto = document.getElementById("formularioContacto");
    if (contacto !== null) {
        contacto.addEventListener("submit", validarContacto);
        document.getElementById("correo").addEventListener("blur", function () {
            revisarSugerenciaCorreo("correo");
        });
    }

    var registro = document.getElementById("formularioRegistro");
    if (registro !== null) {
        registro.addEventListener("submit", validarRegistro);
        document.getElementById("correoRegistro").addEventListener("blur", function () {
            revisarSugerenciaCorreo("correoRegistro");
        });
    }

    var login = document.getElementById("formularioLogin");
    if (login !== null) {
        login.addEventListener("submit", validarLogin);
        document.getElementById("correoLogin").addEventListener("blur", function () {
            revisarSugerenciaCorreo("correoLogin");
        });
    }

    var producto = document.getElementById("formularioProducto");
    if (producto !== null) {
        producto.addEventListener("submit", validarProducto);
        pintarTablaAdmin();
    }
});
