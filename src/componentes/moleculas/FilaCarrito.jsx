import Form from 'react-bootstrap/Form'
import { formatearPrecio } from '../../utils/formato'
import Boton from '../atomos/Boton'
import ImagenProducto from '../atomos/ImagenProducto'

function FilaCarrito({ linea, onCambiarCantidad, onQuitar }) {
  return (
    <tr>
      <td>
        <ImagenProducto origen={linea.imagen} descripcion={linea.nombre} miniatura />
      </td>
      <td>{linea.nombre}</td>
      <td>{formatearPrecio(linea.precio)}</td>
      <td style={{ maxWidth: '7rem' }}>
        <Form.Control
          type="number"
          min="1"
          value={linea.cantidad}
          aria-label={`Cantidad de ${linea.nombre}`}
          onChange={(evento) => onCambiarCantidad(linea.id, evento.target.value)}
        />
      </td>
      <td>{formatearPrecio(linea.subtotal)}</td>
      <td>
        <Boton variante="peligro" tamano="sm" onClick={() => onQuitar(linea.id)}>
          Quitar
        </Boton>
      </td>
    </tr>
  )
}

export default FilaCarrito
