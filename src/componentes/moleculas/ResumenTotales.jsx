import ListGroup from 'react-bootstrap/ListGroup'
import { formatearPrecio } from '../../utils/formato'

function ResumenTotales({ totales }) {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item className="d-flex justify-content-between">
        <span>Neto</span>
        <span>{formatearPrecio(totales.neto)}</span>
      </ListGroup.Item>
      <ListGroup.Item className="d-flex justify-content-between">
        <span>IVA (19%)</span>
        <span>{formatearPrecio(totales.iva)}</span>
      </ListGroup.Item>
      <ListGroup.Item className="d-flex justify-content-between">
        <span>Despacho</span>
        <span>{totales.despacho === 0 ? 'Gratis' : formatearPrecio(totales.despacho)}</span>
      </ListGroup.Item>
      <ListGroup.Item className="d-flex justify-content-between fw-bold">
        <span>Total a pagar</span>
        <span data-testid="total-carrito">{formatearPrecio(totales.total)}</span>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default ResumenTotales
