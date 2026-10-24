import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Titulo from '../../componentes/atomos/Titulo'
import TarjetaCategoria from '../../componentes/moleculas/TarjetaCategoria'
import RejillaProductos from '../../componentes/organismos/RejillaProductos'
import { listarCategorias } from '../../data/categorias'
import { listarProductos } from '../../data/productos'
import { useCarrito } from '../../hooks/useCarrito'

function Categorias() {
  const { agregar } = useCarrito()
  const categorias = listarCategorias()
  const productos = listarProductos()

  return (
    <>
      <Titulo nivel={1} bajada="Los productos separados por tipo.">
        Categorías
      </Titulo>

      <Row xs={2} lg={4} className="g-3 mb-5">
        {categorias.map((categoria) => (
          <Col key={categoria.id}>
            <TarjetaCategoria
              categoria={categoria}
              cantidad={productos.filter((item) => item.categoria === categoria.slug).length}
            />
          </Col>
        ))}
      </Row>

      {categorias.map((categoria) => (
        <section key={categoria.id} className="mb-5">
          <Titulo nivel={2} bajada={categoria.descripcion}>
            {categoria.nombre}
          </Titulo>
          <RejillaProductos
            productos={productos.filter((item) => item.categoria === categoria.slug)}
            onAgregar={agregar}
            mensajeVacio="Todavía no hay productos en esta categoría."
          />
        </section>
      ))}
    </>
  )
}

export default Categorias
