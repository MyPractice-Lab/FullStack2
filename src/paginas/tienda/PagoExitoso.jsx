import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Aviso from '../../componentes/atomos/Aviso'
import Boton from '../../componentes/atomos/Boton'
import FichaOrden from '../../componentes/organismos/FichaOrden'
import { obtenerOrden } from '../../data/ordenes'
import { formatearFecha } from '../../utils/formato'

function PagoExitoso() {
  const { codigo } = useParams()
  const [envio, setEnvio] = useState('')

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
      <div className="d-flex justify-content-between align-items-start flex-wrap">
        <h1 className="zone-titulo h3 text-success">
          Se ha realizado la compra. nro #{orden.numero}
        </h1>
        <p className="small text-muted">Código orden: {orden.codigo}</p>
      </div>

      <p className="zone-bajada">Compra registrada el {formatearFecha(orden.fecha)}.</p>

      {envio !== '' && <Aviso tono="exito">{envio}</Aviso>}

      <FichaOrden orden={orden} />

      <div className="d-flex gap-2 justify-content-center mt-3 flex-wrap">
        <Boton variante="peligro" onClick={() => window.print()}>
          Imprimir boleta en PDF
        </Boton>
        <Boton
          variante="exito"
          onClick={() => setEnvio(`Boleta enviada a ${orden.cliente.correo}.`)}
        >
          Enviar boleta por email
        </Boton>
        <Boton variante="neutro" as={Link} to="/productos">
          Seguir comprando
        </Boton>
      </div>
    </article>
  )
}

export default PagoExitoso
