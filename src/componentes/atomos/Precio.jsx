import { formatearPrecio } from '../../utils/formato'

function Precio({ valor, antes = null }) {
  return (
    <p className="zone-precio mb-1">
      {formatearPrecio(valor)}
      {antes !== null && <span className="zone-precio-antes ms-2">{formatearPrecio(antes)}</span>}
    </p>
  )
}

export default Precio
