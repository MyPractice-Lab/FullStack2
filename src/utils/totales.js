export const COSTO_DESPACHO = 4990
export const MINIMO_DESPACHO_GRATIS = 100000

export function calcularTotales(lineas) {
  const bruto = lineas.reduce((suma, linea) => suma + linea.precio * linea.cantidad, 0)
  const iva = Math.round(bruto - bruto / 1.19)
  const despacho = bruto === 0 || bruto > MINIMO_DESPACHO_GRATIS ? 0 : COSTO_DESPACHO

  return {
    neto: bruto - iva,
    iva,
    bruto,
    despacho,
    total: bruto + despacho,
    unidades: lineas.reduce((suma, linea) => suma + linea.cantidad, 0),
  }
}
