import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSesion } from '../../hooks/useSesion'
import BarraLateralAdmin from '../organismos/BarraLateralAdmin'

function PlantillaAdmin() {
  const { usuario, cerrarSesion } = useSesion()
  const navegar = useNavigate()

  function salir() {
    cerrarSesion()
    navegar('/')
  }

  return (
    <>
      <header className="zone-cabecera py-2">
        <Container fluid>
          <div className="d-flex justify-content-between align-items-center">
            <span className="zone-logo">
              The<span>Zone</span> administración
            </span>
            <span className="small">{usuario?.nombre}</span>
          </div>
        </Container>
      </header>

      <Container fluid className="flex-grow-1">
        <Row>
          <Col md={3} lg={2} className="px-0">
            <BarraLateralAdmin onCerrarSesion={salir} />
          </Col>
          <Col md={9} lg={10} as="main" className="py-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PlantillaAdmin
