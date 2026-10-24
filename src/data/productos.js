import { guardar, leerConSemilla, siguienteId } from './almacenamiento'
import { CLAVES } from './claves'
import { productosSemilla } from './semillas'

function leerProductos() {
  return leerConSemilla(CLAVES.productos, productosSemilla)
}

function guardarProductos(lista) {
  return guardar(CLAVES.productos, lista)
}

export function listarProductos() {
  return leerProductos()
}

export function obtenerProducto(id) {
  const buscado = Number(id)
  return leerProductos().find((producto) => producto.id === buscado) ?? null
}

export function crearProducto(datos) {
  const lista = leerProductos()
  const nuevo = {
    id: siguienteId(lista),
    nombre: datos.nombre,
    categoria: datos.categoria,
    precio: Number(datos.precio),
    oferta: datos.oferta ? Number(datos.oferta) : null,
    stock: Number(datos.stock),
    marca: datos.marca,
    garantia: datos.garantia,
    imagen: datos.imagen || `${import.meta.env.BASE_URL}assets/img/portada.jpg`,
    descripcion: datos.descripcion,
  }

  guardarProductos([...lista, nuevo])
  return nuevo
}

export function actualizarProducto(id, datos) {
  const buscado = Number(id)
  let actualizado = null

  const lista = leerProductos().map((producto) => {
    if (producto.id !== buscado) {
      return producto
    }

    actualizado = {
      ...producto,
      ...datos,
      id: buscado,
      precio: Number(datos.precio ?? producto.precio),
      oferta: datos.oferta ? Number(datos.oferta) : null,
      stock: Number(datos.stock ?? producto.stock),
    }
    return actualizado
  })

  guardarProductos(lista)
  return actualizado
}

export function eliminarProducto(id) {
  const buscado = Number(id)
  const lista = leerProductos().filter((producto) => producto.id !== buscado)
  guardarProductos(lista)
  return lista
}

export function descontarStock(lineas) {
  const porProducto = new Map(lineas.map((linea) => [linea.id, linea.cantidad]))

  const lista = leerProductos().map((producto) => {
    const vendidas = porProducto.get(producto.id)

    if (vendidas === undefined) {
      return producto
    }

    return { ...producto, stock: Math.max(0, producto.stock - vendidas) }
  })

  return guardarProductos(lista)
}
