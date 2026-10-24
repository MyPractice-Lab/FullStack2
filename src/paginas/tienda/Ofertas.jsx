import Titulo from '../../componentes/atomos/Titulo'
import RejillaProductos from '../../componentes/organismos/RejillaProductos'
import { listarProductos } from '../../data/productos'
import { useCarrito } from '../../hooks/useCarrito'
import { tieneOferta } from '../../utils/catalogo'

function Ofertas() {
  const { agregar } = useCarrito()
  const ofertas = listarProductos().filter(tieneOferta)

  return (
    <>
      <Titulo nivel={1} bajada="Precios rebajados mientras dure el stock.">
        Ofertas
      </Titulo>

      <RejillaProductos
        productos={ofertas}
        onAgregar={agregar}
        mensajeVacio="Por ahora no hay productos en oferta."
      />
    </>
  )
}

export default Ofertas
