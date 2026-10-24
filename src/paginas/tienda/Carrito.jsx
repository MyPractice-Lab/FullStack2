import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link, useNavigate } from 'react-router-dom'
import Aviso from '../../componentes/atomos/Aviso'
import Boton from '../../componentes/atomos/Boton'
import Titulo from '../../componentes/atomos/Titulo'
import ResumenTotales from '../../componentes/moleculas/ResumenTotales'
import TablaCarrito from '../../componentes/organismos/TablaCarrito'
import { useCarrito } from '../../hooks/useCarrito'
import { MINIMO_DESPACHO_GRATIS } from '../../utils/totales'
import { formatearPrecio } from '../../utils/formato'

function Carrito() {
  const { detalle, totales, cambiarCantidad, quitar, vaciar } = useCarrito()
  const navegar = useNavigate()

  if (detalle.length === 0) {
    return (
      <>
        <Titulo nivel={1}>Carrito de compras</Titulo>
        <Aviso tono="info">
          Tu carrito está vacío. Mira el <Link to="/productos">catálogo</Link> para agregar
          productos.
        </Aviso>
      </>
    )
  }

  const falta = MINIMO_DESPACHO_GRATIS - totales.bruto

  return (
    <>
      <Titulo nivel={1} bajada="Revisa las cantidades antes de pasar al pago.">
        Carrito de compras
      </Titulo>

      <Row className="g-4">
        <Col lg={8}>
          <TablaCarrito lineas={detalle} onCambiarCantidad={cambiarCantidad} onQuitar={quitar} />
        </Col>

        <Col lg={4}>
          <div className="zone-panel">
            <h2 className="h6">Resumen</h2>
            <ResumenTotales totales={totales} />

            {totales.despacho > 0 && (
              <p className="small text-muted mt-2 mb-0">
                Te faltan {formatearPrecio(falta)} para el despacho gratis.
              </p>
            )}

            <div className="d-grid gap-2 mt-3">
              <Boton onClick={() => navegar('/checkout')}>Comprar ahora</Boton>
              <Boton variante="neutro" onClick={vaciar}>
                Limpiar carrito
              </Boton>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Carrito
