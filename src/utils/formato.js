export function formatearPrecio(valor) {
  return `$${Number(valor).toLocaleString('es-CL')}`
}

export function formatearFecha(isoTexto) {
  return new Date(isoTexto).toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
