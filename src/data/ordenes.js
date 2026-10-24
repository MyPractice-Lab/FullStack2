import { guardar, leerConSemilla } from './almacenamiento'
import { CLAVES } from './claves'

function leerOrdenes() {
  return leerConSemilla(CLAVES.ordenes, [])
}

function guardarOrdenes(lista) {
  return guardar(CLAVES.ordenes, lista)
}

function generarCodigo(numero) {
  return `ORDER${String(numero).padStart(5, '0')}`
}

export function listarOrdenes() {
  return leerOrdenes()
}

export function obtenerOrden(codigo) {
  return leerOrdenes().find((orden) => orden.codigo === codigo) ?? null
}

export function listarOrdenesDeUsuario(usuarioId) {
  const buscado = Number(usuarioId)
  return leerOrdenes().filter((orden) => orden.usuarioId === buscado)
}

export function crearOrden({ cliente, direccion, lineas, totales, estado, usuarioId }) {
  const lista = leerOrdenes()
  const numero = lista.length + 1

  const nueva = {
    codigo: generarCodigo(numero),
    numero,
    fecha: new Date().toISOString(),
    estado,
    usuarioId: usuarioId ?? null,
    cliente,
    direccion,
    lineas,
    totales,
  }

  guardarOrdenes([...lista, nueva])
  return nueva
}

export function actualizarEstadoOrden(codigo, estado) {
  let actualizada = null

  const lista = leerOrdenes().map((orden) => {
    if (orden.codigo !== codigo) {
      return orden
    }

    actualizada = { ...orden, estado }
    return actualizada
  })

  guardarOrdenes(lista)
  return actualizada
}
