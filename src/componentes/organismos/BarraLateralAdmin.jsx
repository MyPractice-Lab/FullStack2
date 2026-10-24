import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'

const ENLACES = [
  { a: '/admin', texto: 'Dashboard', exacto: true },
  { a: '/admin/ordenes', texto: 'Órdenes' },
  { a: '/admin/productos', texto: 'Productos' },
  { a: '/admin/productos/criticos', texto: 'Productos críticos' },
  { a: '/admin/categorias', texto: 'Categorías' },
  { a: '/admin/usuarios', texto: 'Usuarios' },
  { a: '/admin/reportes', texto: 'Reportes' },
  { a: '/admin/perfil', texto: 'Perfil' },
]

function BarraLateralAdmin({ onCerrarSesion }) {
  return (
    <nav className="zone-admin-lateral py-3" aria-label="Menú de administración">
      <Nav className="flex-column">
        {ENLACES.map((enlace) => (
          <Nav.Link key={enlace.a} as={NavLink} to={enlace.a} end={enlace.exacto}>
            {enlace.texto}
          </Nav.Link>
        ))}

        <hr />

        <Nav.Link as={NavLink} to="/">
          Ir a la tienda
        </Nav.Link>
        <Nav.Link as="button" onClick={onCerrarSesion} className="text-start">
          Cerrar sesión
        </Nav.Link>
      </Nav>
    </nav>
  )
}

export default BarraLateralAdmin
