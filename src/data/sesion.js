import { borrar, guardar, leer } from './almacenamiento'
import { CLAVES } from './claves'

export function leerSesion() {
  return leer(CLAVES.sesion)
}

export function guardarSesion(usuario) {
  const { clave: _clave, ...sinClave } = usuario
  return guardar(CLAVES.sesion, sinClave)
}

export function borrarSesion() {
  borrar(CLAVES.sesion)
}
