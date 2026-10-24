import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Titulo from '../../componentes/atomos/Titulo'
import TarjetaEntrada from '../../componentes/moleculas/TarjetaEntrada'
import { listarEntradas } from '../../data/blog'

function Blog() {
  const entradas = listarEntradas()

  return (
    <>
      <Titulo nivel={1} bajada="Guías y recomendaciones para armar tu setup.">
        Blog
      </Titulo>

      <Row xs={1} md={2} lg={3} className="g-3">
        {entradas.map((entrada) => (
          <Col key={entrada.slug}>
            <TarjetaEntrada entrada={entrada} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Blog
