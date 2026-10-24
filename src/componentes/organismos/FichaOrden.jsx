import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { formatearPrecio } from '../../utils/formato'
import FichaTecnica from '../moleculas/FichaTecnica'
import TablaResumenOrden from './TablaResumenOrden'

function FichaOrden({ orden }) {
  const { cliente, direccion } = orden

  return (
    <>
      <Row className="g-3 mb-3">
        <Col md={6}>
          <h2 className="h6">Información del cliente</h2>
          <FichaTecnica
            titulo="Datos del cliente"
            filas={[
              { campo: 'Nombre', valor: `${cliente.nombre} ${cliente.apellidos}` },
              { campo: 'Correo', valor: cliente.correo },
            ]}
          />
        </Col>
        <Col md={6}>
          <h2 className="h6">Dirección de entrega</h2>
          <FichaTecnica
            titulo="Dirección de entrega de los productos"
            filas={[
              { campo: 'Calle', valor: direccion.calle },
              { campo: 'Departamento', valor: direccion.departamento || 'Sin departamento' },
              { campo: 'Región', valor: direccion.region },
              { campo: 'Comuna', valor: direccion.comuna },
              { campo: 'Indicaciones', valor: direccion.indicaciones || 'Sin indicaciones' },
            ]}
          />
        </Col>
      </Row>

      <TablaResumenOrden lineas={orden.lineas} />

      <p className="zone-panel text-center h5 mb-0">
        Total {orden.estado === 'pagada' ? 'pagado' : 'de la compra'}:{' '}
        {formatearPrecio(orden.totales.total)}
      </p>
    </>
  )
}

export default FichaOrden
