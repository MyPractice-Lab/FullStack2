import { useContext } from 'react'
import { SesionContexto } from '../contexto/SesionContexto'

export function useSesion() {
  const contexto = useContext(SesionContexto)

  if (contexto === null) {
    throw new Error('useSesion debe usarse dentro de ProveedorSesion')
  }

  return contexto
}
