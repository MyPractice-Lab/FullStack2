import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { listarCategorias } from '../../data/categorias'
import { useCarrito } from '../../hooks/useCarrito'
import { useSesion } from '../../hooks/useSesion'
import { formatearPrecio } from '../../utils/formato'
import Boton from '../atomos/Boton'
import Buscador from '../moleculas/Buscador'

function Encabezado() {
  const { totales, unidades } = useCarrito()
  const { usuario, autenticado, esAdministrador, cerrarSesion } = useSesion()
  const categorias = listarCategorias()
  const navegar = useNavigate()

  function salir() {
    cerrarSesion()
    navegar('/')
  }

  return (
    <header className="zone-cabecera">
      <Container className="py-2 d-flex flex-wrap align-items-center gap-3">
        <Link className="zone-logo" to="/">
          The<span>Zone</span>
        </Link>

        <div className="flex-grow-1" style={{ maxWidth: '26rem' }}>
          <Buscador />
        </div>

        <div className="ms-auto d-flex gap-2">
          {autenticado ? (
            <>
              <span className="align-self-center small">Hola, {usuario.nombre.split(' ')[0]}</span>
              {esAdministrador && (
                <Boton variante="neutro" tamano="sm" as={Link} to="/admin">
                  Administración
                </Boton>
              )}
              <Boton variante="secundario" tamano="sm" onClick={salir}>
                Cerrar sesión
              </Boton>
            </>
          ) : (
            <>
              <Boton variante="secundario" tamano="sm" as={Link} to="/login">
                Iniciar sesión
              </Boton>
              <Boton tamano="sm" as={Link} to="/registro">
                Crear cuenta
              </Boton>
            </>
          )}
        </div>
      </Container>

      <Navbar expand="lg" className="border-top">
        <Container>
          <Navbar.Toggle aria-controls="menu-principal" label="Abrir el menú" />
          <Navbar.Collapse id="menu-principal">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
              <NavDropdown title="Categorías" id="menu-categorias">
                <NavDropdown.Item as={Link} to="/categorias">
                  Ver todas
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {categorias.map((categoria) => (
                  <NavDropdown.Item
                    key={categoria.id}
                    as={Link}
                    to={`/categorias/${categoria.slug}`}
                  >
                    {categoria.nombre}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <Nav.Link as={NavLink} to="/productos">
                Productos
              </Nav.Link>
              <Nav.Link as={NavLink} to="/ofertas">
                Ofertas
              </Nav.Link>
              <Nav.Link as={NavLink} to="/nosotros">
                Nosotros
              </Nav.Link>
              <Nav.Link as={NavLink} to="/blog">
                Blog
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contacto">
                Contacto
              </Nav.Link>
            </Nav>

            <Boton variante="exito" as={Link} to="/carrito">
              Carrito {formatearPrecio(totales.total)}
              <span className="visually-hidden">, {unidades} unidades</span>
            </Boton>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Encabezado
