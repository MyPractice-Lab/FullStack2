import { entradasBlog } from './semillas'

export function listarEntradas() {
  return entradasBlog
}

export function obtenerEntrada(slug) {
  return entradasBlog.find((entrada) => entrada.slug === slug) ?? null
}
