import { guardar, leerConSemilla } from './almacenamiento'
import { CLAVES } from './claves'

export function leerCarrito() {
  return leerConSemilla(CLAVES.carrito, [])
}

export function guardarCarrito(lineas) {
  return guardar(CLAVES.carrito, lineas)
}
