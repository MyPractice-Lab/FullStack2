import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import Aviso from '../../componentes/atomos/Aviso'
import Titulo from '../../componentes/atomos/Titulo'
import { listarProductos } from '../../data/productos'
import { STOCK_CRITICO, productosCriticos } from '../../utils/catalogo'

function ProductosCriticos() {
  const [umbral, setUmbral] = useState(STOCK_CRITICO)
  const criticos = productosCriticos(listarProductos(), umbral)

  return (
    <>
      <Titulo nivel={1} bajada="Productos que conviene reponer antes de quedar sin stock.">
        Listado de productos críticos
      </Titulo>

      <Form.Group className="mb-3" style={{ maxWidth: '16rem' }}>
        <Form.Label htmlFor="umbral-critico">Umbral de stock</Form.Label>
        <Form.Control
          id="umbral-critico"
          type="number"
          min="0"
          value={umbral}
          onChange={(evento) => setUmbral(Number(evento.target.value))}
        />
      </Form.Group>

      {criticos.length === 0 ? (
        <Aviso tono="exito">Ningún producto está por debajo del umbral indicado.</Aviso>
      ) : (
        <Table responsive bordered className="align-middle bg-white">
          <caption className="visually-hidden">Productos con stock bajo el umbral</caption>
          <thead>
            <tr>
              <th scope="col">Producto</th>
              <th scope="col">Stock</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {criticos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td className="zone-stock-critico">{producto.stock}</td>
                <td>
                  <Link to={`/admin/productos/${producto.id}`}>Reponer stock</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductosCriticos
