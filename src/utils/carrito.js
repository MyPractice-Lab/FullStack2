export function agregarLinea(lineas, id, cantidad = 1) {
  const existente = lineas.find((linea) => linea.id === id)

  if (existente === undefined) {
    return [...lineas, { id, cantidad }]
  }

  return lineas.map((linea) =>
    linea.id === id ? { ...linea, cantidad: linea.cantidad + cantidad } : linea,
  )
}

export function cambiarCantidadLinea(lineas, id, cantidad) {
  const nueva = Number(cantidad)

  if (Number.isNaN(nueva) || nueva < 1) {
    return quitarLinea(lineas, id)
  }

  return lineas.map((linea) => (linea.id === id ? { ...linea, cantidad: nueva } : linea))
}

export function quitarLinea(lineas, id) {
  return lineas.filter((linea) => linea.id !== id)
}

export function contarUnidades(lineas) {
  return lineas.reduce((suma, linea) => suma + linea.cantidad, 0)
}
