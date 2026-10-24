import { Link, useParams } from 'react-router-dom'
import Titulo from '../../componentes/atomos/Titulo'
import RejillaProductos from '../../componentes/organismos/RejillaProductos'
import { obtenerCategoria } from '../../data/categorias'
import { listarProductos } from '../../data/productos'
import { useCarrito } from '../../hooks/useCarrito'

function Categoria() {
  const { slug } = useParams()
  const { agregar } = useCarrito()

  const categoria = obtenerCategoria(slug)

  if (categoria === null) {
    return (
      <p className="text-muted">
        Esa categoría no existe. <Link to="/categorias">Ver todas las categorías</Link>.
      </p>
    )
  }

  const productos = listarProductos().filter((producto) => producto.categoria === slug)

  return (
    <>
      <Titulo nivel={1} bajada={categoria.descripcion}>
        {categoria.nombre}
      </Titulo>

      <RejillaProductos
        productos={productos}
        onAgregar={agregar}
        mensajeVacio="Todavía no hay productos en esta categoría."
      />
    </>
  )
}

export default Categoria
