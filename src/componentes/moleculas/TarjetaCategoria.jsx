import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

function TarjetaCategoria({ categoria, cantidad }) {
  return (
    <Card className="h-100">
      <Link to={`/categorias/${categoria.slug}`}>
        <img
          src={categoria.imagen}
          alt={categoria.nombre}
          className="zone-imagen-producto w-100"
          loading="lazy"
        />
      </Link>
      <Card.Body>
        <Card.Title as="h3" className="h6">
          <Link to={`/categorias/${categoria.slug}`}>{categoria.nombre}</Link>
        </Card.Title>
        <p className="small text-muted mb-0">{categoria.descripcion}</p>
        {cantidad !== undefined && (
          <p className="small mb-0">
            {cantidad} {cantidad === 1 ? 'producto' : 'productos'}
          </p>
        )}
      </Card.Body>
    </Card>
  )
}

export default TarjetaCategoria
