import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { listarCategorias } from '../../data/categorias'
import TarjetaProducto from '../moleculas/TarjetaProducto'

function RejillaProductos({ productos, onAgregar, mensajeVacio = 'No hay productos que mostrar.' }) {
  if (productos.length === 0) {
    return <p className="text-muted">{mensajeVacio}</p>
  }

  const nombres = new Map(listarCategorias().map((categoria) => [categoria.slug, categoria.nombre]))

  return (
    <Row xs={1} sm={2} lg={4} className="g-3">
      {productos.map((producto) => (
        <Col key={producto.id}>
          <TarjetaProducto
            producto={producto}
            onAgregar={onAgregar}
            nombreCategoria={nombres.get(producto.categoria)}
          />
        </Col>
      ))}
    </Row>
  )
}

export default RejillaProductos
