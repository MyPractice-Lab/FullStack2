import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import Titulo from '../../componentes/atomos/Titulo'
import TarjetaMetrica from '../../componentes/moleculas/TarjetaMetrica'
import { listarOrdenes } from '../../data/ordenes'
import { listarProductos } from '../../data/productos'
import { listarUsuarios } from '../../data/usuarios'
import { productosCriticos } from '../../utils/catalogo'
import { formatearPrecio } from '../../utils/formato'

const ACCESOS = [
  { a: '/admin/ordenes', titulo: 'Órdenes', texto: 'Gestión y seguimiento de las órdenes de compra realizadas.' },
  { a: '/admin/productos', titulo: 'Productos', texto: 'Administrar inventario y detalles de los productos disponibles.' },
  { a: '/admin/categorias', titulo: 'Categorías', texto: 'Organizar productos en categorías para facilitar la navegación.' },
  { a: '/admin/usuarios', titulo: 'Usuarios', texto: 'Gestión de cuentas de usuario y sus roles dentro del sistema.' },
  { a: '/admin/reportes', titulo: 'Reportes', texto: 'Informes detallados sobre las operaciones del sistema.' },
  { a: '/admin/perfil', titulo: 'Perfil', texto: 'Administración de la información personal de la cuenta.' },
]

function Dashboard() {
  const ordenes = listarOrdenes()
  const productos = listarProductos()
  const usuarios = listarUsuarios()

  const pagadas = ordenes.filter((orden) => orden.estado === 'pagada')
  const vendido = pagadas.reduce((suma, orden) => suma + orden.totales.total, 0)
  const inventario = productos.reduce((suma, producto) => suma + producto.stock, 0)

  return (
    <>
      <Titulo nivel={1} bajada="Resumen de las actividades de la tienda.">
        Dashboard
      </Titulo>

      <Row xs={1} md={3} className="g-3 mb-4">
        <Col>
          <TarjetaMetrica
            titulo="Compras pagadas"
            valor={pagadas.length}
            detalle={`Total vendido: ${formatearPrecio(vendido)}`}
            color="primary"
          />
        </Col>
        <Col>
          <TarjetaMetrica
            titulo="Productos"
            valor={productos.length}
            detalle={`Inventario actual: ${inventario} unidades`}
            color="success"
          />
        </Col>
        <Col>
          <TarjetaMetrica
            titulo="Usuarios"
            valor={usuarios.length}
            detalle={`Productos con stock critico: ${productosCriticos(productos).length}`}
            color="warning"
          />
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className="g-3">
        {ACCESOS.map((acceso) => (
          <Col key={acceso.a}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title as="h2" className="h6">
                  <Link to={acceso.a}>{acceso.titulo}</Link>
                </Card.Title>
                <p className="small mb-0">{acceso.texto}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Dashboard
