import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { formatearFecha } from '../../utils/formato'

function TarjetaEntrada({ entrada }) {
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title as="h3" className="h6">
          <Link to={`/blog/${entrada.slug}`}>{entrada.titulo}</Link>
        </Card.Title>
        <time dateTime={entrada.fecha} className="small text-muted d-block mb-2">
          {formatearFecha(entrada.fecha)}
        </time>
        <p className="mb-0">{entrada.resumen}</p>
      </Card.Body>
    </Card>
  )
}

export default TarjetaEntrada
