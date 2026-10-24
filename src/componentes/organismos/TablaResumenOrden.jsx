import Table from 'react-bootstrap/Table'
import { formatearPrecio } from '../../utils/formato'
import ImagenProducto from '../atomos/ImagenProducto'

function TablaResumenOrden({ lineas, titulo = 'Detalle de los productos de la compra' }) {
  return (
    <Table responsive bordered size="sm" className="align-middle bg-white">
      <caption className="visually-hidden">{titulo}</caption>
      <thead>
        <tr>
          <th scope="col">Imagen</th>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {lineas.map((linea) => (
          <tr key={linea.id}>
            <td>
              <ImagenProducto origen={linea.imagen} descripcion={linea.nombre} miniatura />
            </td>
            <td>{linea.nombre}</td>
            <td>{formatearPrecio(linea.precio)}</td>
            <td>{linea.cantidad}</td>
            <td>{formatearPrecio(linea.subtotal)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TablaResumenOrden
