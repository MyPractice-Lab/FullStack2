import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Titulo from '../../componentes/atomos/Titulo'
import FiltrosCatalogo from '../../componentes/organismos/FiltrosCatalogo'
import RejillaProductos from '../../componentes/organismos/RejillaProductos'
import { listarCategorias } from '../../data/categorias'
import { listarProductos } from '../../data/productos'
import { useCarrito } from '../../hooks/useCarrito'
import { filtrarProductos } from '../../utils/catalogo'

function Productos() {
  const [parametros] = useSearchParams()
  const { agregar } = useCarrito()

  const [criterios, setCriterios] = useState({
    texto: parametros.get('buscar') ?? '',
    categoria: parametros.get('categoria') ?? 'todas',
    orden: 'relevancia',
  })

  const productos = filtrarProductos(listarProductos(), criterios)

  return (
    <>
      <Titulo nivel={1} bajada="Todo el catálogo de The Zone en un solo lugar.">
        Productos
      </Titulo>

      <FiltrosCatalogo
        criterios={criterios}
        categorias={listarCategorias()}
        onCambiar={setCriterios}
        resultados={productos.length}
      />

      <RejillaProductos
        productos={productos}
        onAgregar={agregar}
        mensajeVacio="No hay productos que coincidan con la búsqueda."
      />
    </>
  )
}

export default Productos
