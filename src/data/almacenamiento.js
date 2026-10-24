export function leer(clave) {
  const crudo = localStorage.getItem(clave)

  if (crudo === null) {
    return null
  }

  try {
    return JSON.parse(crudo)
  } catch {
    localStorage.removeItem(clave)
    return null
  }
}

export function guardar(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor))
  return valor
}

export function borrar(clave) {
  localStorage.removeItem(clave)
}

export function leerConSemilla(clave, semilla) {
  const guardado = leer(clave)

  if (guardado === null) {
    return guardar(clave, semilla)
  }

  return guardado
}

export function siguienteId(lista) {
  return lista.reduce((mayor, item) => Math.max(mayor, item.id), 0) + 1
}
