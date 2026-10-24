import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import Etiqueta from '../../componentes/atomos/Etiqueta'
import Titulo from '../../componentes/atomos/Titulo'
import { listarOrdenes } from '../../data/ordenes'
import { formatearFecha, formatearPrecio } from '../../utils/formato'

function OrdenesAdmin() {
  const ordenes = listarOrdenes()

  return (
    <>
      <Titulo nivel={1} bajada="Todas las órdenes registradas por la tienda.">
        Órdenes y boletas
      </Titulo>

      {ordenes.length === 0 ? (
        <p className="text-muted">Todavía no hay órdenes registradas.</p>
      ) : (
        <Table responsive bordered className="align-middle bg-white">
          <caption className="visually-hidden">Listado de órdenes de compra</caption>
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Fecha</th>
              <th scope="col">Cliente</th>
              <th scope="col">Productos</th>
              <th scope="col">Total</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.codigo}>
                <td>{orden.codigo}</td>
                <td>{formatearFecha(orden.fecha)}</td>
                <td>
                  {orden.cliente.nombre} {orden.cliente.apellidos}
                </td>
                <td>{orden.totales.unidades}</td>
                <td>{formatearPrecio(orden.totales.total)}</td>
                <td>
                  <Etiqueta tono={orden.estado === 'pagada' ? 'exito' : 'oferta'}>
                    {orden.estado === 'pagada' ? 'Pagada' : 'Rechazada'}
                  </Etiqueta>
                </td>
                <td>
                  <Link to={`/admin/ordenes/${orden.codigo}`}>Mostrar boleta</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrdenesAdmin
