import { Link, useParams } from 'react-router-dom'
import Aviso from '../../componentes/atomos/Aviso'
import Boton from '../../componentes/atomos/Boton'
import FichaOrden from '../../componentes/organismos/FichaOrden'
import { obtenerOrden } from '../../data/ordenes'

function PagoRechazado() {
  const { codigo } = useParams()
  const orden = obtenerOrden(codigo)

  if (orden === null) {
    return (
      <p className="text-muted">
        No encontramos esa orden. <Link to="/productos">Volver al catálogo</Link>.
      </p>
    )
  }

  return (
    <article>
      <h1 className="zone-titulo h3 text-danger">No se pudo realizar el pago. nro #{orden.numero}</h1>

      <Aviso tono="error">
        El banco rechazó la transacción. Tus productos siguen en el carrito, puedes intentarlo de
        nuevo con otro medio de pago.
      </Aviso>

      <div className="text-center mb-3">
        <Boton variante="exito" as={Link} to="/checkout">
          Volver a realizar el pago
        </Boton>
      </div>

      <FichaOrden orden={orden} />
    </article>
  )
}

export default PagoRechazado
