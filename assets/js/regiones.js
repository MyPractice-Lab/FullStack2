/* ==========================================================================
   The Zone - Regiones y comunas de Chile
   Llena el menú de comunas según la región que elija el usuario.
   ========================================================================== */

var regionesChile = [
    { nombre: "Arica y Parinacota", comunas: ["Arica", "Camarones", "Putre", "General Lagos"] },
    { nombre: "Tarapaca", comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica"] },
    { nombre: "Antofagasta", comunas: ["Antofagasta", "Calama", "Tocopilla", "Mejillones", "Taltal"] },
    { nombre: "Atacama", comunas: ["Copiapo", "Vallenar", "Caldera", "Chanaral", "Huasco"] },
    { nombre: "Coquimbo", comunas: ["La Serena", "Coquimbo", "Ovalle", "Illapel", "Vicuna"] },
    { nombre: "Valparaiso", comunas: ["Valparaiso", "Viña del Mar", "Quilpue", "Villa Alemana", "San Antonio", "Quillota"] },
    { nombre: "Metropolitana de Santiago", comunas: ["Santiago", "Providencia", "Las Condes", "Maipu", "Puente Alto", "La Florida", "Nunoa", "Recoleta", "San Bernardo"] },
    { nombre: "Libertador General Bernardo O'Higgins", comunas: ["Rancagua", "San Fernando", "Rengo", "Machali", "Santa Cruz"] },
    { nombre: "Maule", comunas: ["Talca", "Curico", "Linares", "Constitucion", "Cauquenes"] },
    { nombre: "Nuble", comunas: ["Chillan", "Chillán Viejo", "San Carlos", "Bulnes", "Quirihue"] },
    { nombre: "Biobio", comunas: ["Concepcion", "Talcahuano", "Los Angeles", "Chiguayante", "San Pedro de la Paz", "Coronel"] },
    { nombre: "La Araucanía", comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Angol", "Pucon"] },
    { nombre: "Los Rios", comunas: ["Valdivia", "La Unión", "Río Bueno", "Panguipulli", "Lanco"] },
    { nombre: "Los Lagos", comunas: ["Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas"] },
    { nombre: "Aysén del General Carlos Ibáñez del Campo", comunas: ["Coyhaique", "Puerto Aysén", "Chile Chico", "Cochrane"] },
    { nombre: "Magallanes y de la Antártica Chilena", comunas: ["Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos"] }
];

/* Carga las regiones en el menú desplegable. */
function cargarRegiones() {
    var selectorRegion = document.getElementById("region");
    if (selectorRegion === null) {
        return;
    }

    for (var i = 0; i < regionesChile.length; i++) {
        var opcion = document.createElement("option");
        opcion.value = regionesChile[i].nombre;
        opcion.textContent = regionesChile[i].nombre;
        selectorRegion.appendChild(opcion);
    }

    selectorRegion.addEventListener("change", cargarComunas);
}

/* Carga las comunas de la región elegida. */
function cargarComunas() {
    var selectorRegion = document.getElementById("region");
    var selectorComuna = document.getElementById("comuna");

    selectorComuna.innerHTML = '<option value="">Selecciona una comuna</option>';

    for (var i = 0; i < regionesChile.length; i++) {
        if (regionesChile[i].nombre === selectorRegion.value) {
            var comunas = regionesChile[i].comunas;
            for (var j = 0; j < comunas.length; j++) {
                var opcion = document.createElement("option");
                opcion.value = comunas[j];
                opcion.textContent = comunas[j];
                selectorComuna.appendChild(opcion);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", cargarRegiones);
