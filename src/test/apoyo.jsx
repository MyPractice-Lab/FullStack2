import { MemoryRouter } from 'react-router-dom'
import { ProveedorCarrito } from '../contexto/CarritoContexto'
import { ProveedorSesion } from '../contexto/SesionContexto'

export function ConRutas({ children, ruta = '/' }) {
  return <MemoryRouter initialEntries={[ruta]}>{children}</MemoryRouter>
}

export function ConTienda({ children, ruta = '/' }) {
  return (
    <MemoryRouter initialEntries={[ruta]}>
      <ProveedorSesion>
        <ProveedorCarrito>{children}</ProveedorCarrito>
      </ProveedorSesion>
    </MemoryRouter>
  )
}
