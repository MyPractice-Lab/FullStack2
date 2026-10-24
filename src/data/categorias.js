import { guardar, leerConSemilla, siguienteId } from './almacenamiento'
import { CLAVES } from './claves'
import { categoriasSemilla } from './semillas'

function leerCategorias() {
  return leerConSemilla(CLAVES.categorias, categoriasSemilla)
}

function guardarCategorias(lista) {
  return guardar(CLAVES.categorias, lista)
}

function crearSlug(nombre) {
  return nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function listarCategorias() {
  return leerCategorias()
}

export function obtenerCategoria(slug) {
  return leerCategorias().find((categoria) => categoria.slug === slug) ?? null
}

export function obtenerCategoriaPorId(id) {
  const buscado = Number(id)
  return leerCategorias().find((categoria) => categoria.id === buscado) ?? null
}

export function crearCategoria(datos) {
  const lista = leerCategorias()
  const nueva = {
    id: siguienteId(lista),
    slug: crearSlug(datos.nombre),
    nombre: datos.nombre,
    descripcion: datos.descripcion,
    imagen: datos.imagen || `${import.meta.env.BASE_URL}assets/img/portada.jpg`,
  }

  guardarCategorias([...lista, nueva])
  return nueva
}

export function actualizarCategoria(id, datos) {
  const buscado = Number(id)
  let actualizada = null

  const lista = leerCategorias().map((categoria) => {
    if (categoria.id !== buscado) {
      return categoria
    }

    actualizada = { ...categoria, ...datos, id: buscado, slug: categoria.slug }
    return actualizada
  })

  guardarCategorias(lista)
  return actualizada
}

export function eliminarCategoria(id) {
  const buscado = Number(id)
  const lista = leerCategorias().filter((categoria) => categoria.id !== buscado)
  guardarCategorias(lista)
  return lista
}
