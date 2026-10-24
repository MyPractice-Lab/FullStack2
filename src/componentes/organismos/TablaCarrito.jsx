import Table from 'react-bootstrap/Table'
import FilaCarrito from '../moleculas/FilaCarrito'

function TablaCarrito({ lineas, onCambiarCantidad, onQuitar }) {
  return (
    <Table responsive bordered className="align-middle bg-white">
      <caption className="visually-hidden">Productos agregados al carrito</caption>
      <thead>
        <tr>
          <th scope="col">Imagen</th>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Subtotal</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {lineas.map((linea) => (
          <FilaCarrito
            key={linea.id}
            linea={linea}
            onCambiarCantidad={onCambiarCantidad}
            onQuitar={onQuitar}
          />
        ))}
      </tbody>
    </Table>
  )
}

export default TablaCarrito
