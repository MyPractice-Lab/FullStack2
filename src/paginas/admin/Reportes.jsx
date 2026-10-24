import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Titulo from '../../componentes/atomos/Titulo'
import TarjetaMetrica from '../../componentes/moleculas/TarjetaMetrica'
import { listarCategorias } from '../../data/categorias'
import { listarOrdenes } from '../../data/ordenes'
import { listarProductos } from '../../data/productos'
import { formatearPrecio } from '../../utils/formato'

function Reportes() {
  const ordenes = listarOrdenes()
  const productos = listarProductos()
  const categorias = listarCategorias()

  const pagadas = ordenes.filter((orden) => orden.estado === 'pagada')
  const rechazadas = ordenes.length - pagadas.length
  const vendido = pagadas.reduce((suma, orden) => suma + orden.totales.total, 0)
  const promedio = pagadas.length === 0 ? 0 : Math.round(vendido / pagadas.length)

  const unidadesPorProducto = new Map()

  for (const orden of pagadas) {
    for (const linea of orden.lineas) {
      unidadesPorProducto.set(
        linea.nombre,
        (unidadesPorProducto.get(linea.nombre) ?? 0) + linea.cantidad,
      )
    }
  }

  const masVendidos = [...unidadesPorProducto.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)

  return (
    <>
      <Titulo nivel={1} bajada="Informe generado a partir de las órdenes registradas.">
        Reportes
      </Titulo>

      <Row xs={1} md={3} className="g-3 mb-4">
        <Col>
          <TarjetaMetrica titulo="Ventas pagadas" valor={formatearPrecio(vendido)} color="primary" />
        </Col>
        <Col>
          <TarjetaMetrica titulo="Ticket promedio" valor={formatearPrecio(promedio)} color="success" />
        </Col>
        <Col>
          <TarjetaMetrica
            titulo="Pagos rechazados"
            valor={rechazadas}
            detalle={`De ${ordenes.length} intentos`}
            color="warning"
          />
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={6}>
          <h2 className="h6">Productos más vendidos</h2>
          {masVendidos.length === 0 ? (
            <p className="text-muted">Todavía no hay ventas pagadas.</p>
          ) : (
            <Table bordered size="sm" className="bg-white">
              <caption className="visually-hidden">Productos con más unidades vendidas</caption>
              <thead>
                <tr>
                  <th scope="col">Producto</th>
                  <th scope="col">Unidades</th>
                </tr>
              </thead>
              <tbody>
                {masVendidos.map(([nombre, unidades]) => (
                  <tr key={nombre}>
                    <td>{nombre}</td>
                    <td>{unidades}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>

        <Col lg={6}>
          <h2 className="h6">Inventario por categoría</h2>
          <Table bordered size="sm" className="bg-white">
            <caption className="visually-hidden">Stock disponible por categoría</caption>
            <thead>
              <tr>
                <th scope="col">Categoría</th>
                <th scope="col">Productos</th>
                <th scope="col">Unidades en stock</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria) => {
                const deLaCategoria = productos.filter(
                  (producto) => producto.categoria === categoria.slug,
                )

                return (
                  <tr key={categoria.id}>
                    <td>{categoria.nombre}</td>
                    <td>{deLaCategoria.length}</td>
                    <td>{deLaCategoria.reduce((suma, producto) => suma + producto.stock, 0)}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  )
}

export default Reportes
