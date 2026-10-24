import { useContext } from 'react'
import { CarritoContexto } from '../contexto/CarritoContexto'

export function useCarrito() {
  const contexto = useContext(CarritoContexto)

  if (contexto === null) {
    throw new Error('useCarrito debe usarse dentro de ProveedorCarrito')
  }

  return contexto
}
