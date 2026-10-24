import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'

function PieDePagina() {
  return (
    <footer className="zone-pie py-4">
      <Container>
        <Row className="g-4">
          <Col md={3} as="section">
            <h3>The Zone</h3>
            <p className="mb-0">
              Tienda especializada en artículos gamer. Despachamos a todo Chile en 3 a 5 días
              hábiles.
            </p>
          </Col>
          <Col md={3} as="section">
            <h3>Navegación</h3>
            <ul className="list-unstyled mb-0">
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/productos">Productos</Link>
              </li>
              <li>
                <Link to="/ofertas">Ofertas</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/nosotros">Nosotros</Link>
              </li>
            </ul>
          </Col>
          <Col md={3} as="section">
            <h3>Tu cuenta</h3>
            <ul className="list-unstyled mb-0">
              <li>
                <Link to="/login">Iniciar sesión</Link>
              </li>
              <li>
                <Link to="/registro">Crear cuenta</Link>
              </li>
              <li>
                <Link to="/carrito">Mi carrito</Link>
              </li>
              <li>
                <Link to="/contacto">Contacto</Link>
              </li>
            </ul>
          </Col>
          <Col md={3} as="section">
            <h3>Contacto</h3>
            <ul className="list-unstyled mb-0">
              <li>Av. Providencia 1234, Santiago</li>
              <li>+56 2 2345 6789</li>
              <li>
                <a href="mailto:contacto@thezone.cl">contacto@thezone.cl</a>
              </li>
              <li>Lunes a viernes de 9:00 a 19:00</li>
            </ul>
          </Col>
        </Row>
        <p className="small text-center mt-4 mb-0">
          The Zone © 2026 - Proyecto académico DSY1104 Desarrollo Fullstack II
        </p>
      </Container>
    </footer>
  )
}

export default PieDePagina
