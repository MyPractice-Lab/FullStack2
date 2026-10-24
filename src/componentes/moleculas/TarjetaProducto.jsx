import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { porcentajeDescuento, precioFinal, tieneOferta } from '../../utils/catalogo'
import Boton from '../atomos/Boton'
import Etiqueta from '../atomos/Etiqueta'
import ImagenProducto from '../atomos/ImagenProducto'
import Precio from '../atomos/Precio'

function TarjetaProducto({ producto, onAgregar, nombreCategoria }) {
  const enOferta = tieneOferta(producto)
  const sinStock = producto.stock === 0

  return (
    <Card className="h-100">
      <Link to={`/producto/${producto.id}`} aria-label={`Ver ${producto.nombre}`}>
        <ImagenProducto origen={producto.imagen} descripcion={producto.nombre} />
      </Link>

      <Card.Body className="d-flex flex-column">
        <div className="mb-2 d-flex gap-2">
          <Etiqueta>{nombreCategoria ?? producto.categoria}</Etiqueta>
          {enOferta && <Etiqueta tono="oferta">-{porcentajeDescuento(producto)}%</Etiqueta>}
          {sinStock && <Etiqueta tono="aviso">Sin stock</Etiqueta>}
        </div>

        <Card.Title as="h3" className="h6">
          {producto.nombre}
        </Card.Title>

        <Precio valor={precioFinal(producto)} antes={enOferta ? producto.precio : null} />

        <p className="small text-muted mb-3">
          {sinStock ? 'Agotado por ahora' : `Stock disponible: ${producto.stock}`}
        </p>

        <div className="mt-auto d-flex gap-2">
          <Boton variante="secundario" as={Link} to={`/producto/${producto.id}`}>
            Ver
          </Boton>
          <Boton onClick={() => onAgregar(producto)} deshabilitado={sinStock}>
            Agregar
          </Boton>
        </div>
      </Card.Body>
    </Card>
  )
}

export default TarjetaProducto
