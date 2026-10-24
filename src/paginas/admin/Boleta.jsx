import { Link, useParams } from 'react-router-dom'
import Boton from '../../componentes/atomos/Boton'
import Etiqueta from '../../componentes/atomos/Etiqueta'
import Titulo from '../../componentes/atomos/Titulo'
import FichaOrden from '../../componentes/organismos/FichaOrden'
import { obtenerOrden } from '../../data/ordenes'
import { formatearFecha } from '../../utils/formato'

function Boleta() {
  const { codigo } = useParams()
  const orden = obtenerOrden(codigo)

  if (orden === null) {
    return (
      <p className="text-muted">
        No encontramos esa orden. <Link to="/admin/ordenes">Volver al listado</Link>.
      </p>
    )
  }

  return (
    <>
      <Titulo nivel={1} bajada={`Emitida el ${formatearFecha(orden.fecha)}.`}>
        Boleta {orden.codigo}
      </Titulo>

      <p>
        Estado del pago:{' '}
        <Etiqueta tono={orden.estado === 'pagada' ? 'exito' : 'oferta'}>
          {orden.estado === 'pagada' ? 'Pagada' : 'Rechazada'}
        </Etiqueta>
      </p>

      <FichaOrden orden={orden} />

      <div className="d-flex gap-2 mt-3">
        <Boton variante="neutro" as={Link} to="/admin/ordenes">
          Volver al listado
        </Boton>
        <Boton onClick={() => window.print()}>Imprimir boleta</Boton>
      </div>
    </>
  )
}

export default Boleta
