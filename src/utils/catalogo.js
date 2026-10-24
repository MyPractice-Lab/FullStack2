export const STOCK_CRITICO = 5

export function precioFinal(producto) {
  return tieneOferta(producto) ? producto.oferta : producto.precio
}

export function tieneOferta(producto) {
  return typeof producto.oferta === 'number' && producto.oferta > 0 && producto.oferta < producto.precio
}

export function porcentajeDescuento(producto) {
  if (!tieneOferta(producto)) {
    return 0
  }

  return Math.round((1 - producto.oferta / producto.precio) * 100)
}

export function ordenarProductos(lista, orden) {
  const copia = [...lista]

  if (orden === 'menor') {
    return copia.sort((a, b) => precioFinal(a) - precioFinal(b))
  }

  if (orden === 'mayor') {
    return copia.sort((a, b) => precioFinal(b) - precioFinal(a))
  }

  if (orden === 'nombre') {
    return copia.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
  }

  return copia
}

export function filtrarProductos(lista, criterios = {}) {
  const { texto = '', categoria = 'todas', orden = 'relevancia', soloOfertas = false } = criterios
  const buscado = texto.trim().toLowerCase()

  const filtrados = lista.filter((producto) => {
    const coincideCategoria = categoria === 'todas' || producto.categoria === categoria
    const coincideTexto = producto.nombre.toLowerCase().includes(buscado)
    const coincideOferta = soloOfertas === false || tieneOferta(producto)

    return coincideCategoria && coincideTexto && coincideOferta
  })

  return ordenarProductos(filtrados, orden)
}

export function productosCriticos(lista, umbral = STOCK_CRITICO) {
  return lista
    .filter((producto) => producto.stock <= umbral)
    .sort((a, b) => a.stock - b.stock)
}
