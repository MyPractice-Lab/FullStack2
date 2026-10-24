import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import Boton from '../../componentes/atomos/Boton'
import Titulo from '../../componentes/atomos/Titulo'
import TarjetaCategoria from '../../componentes/moleculas/TarjetaCategoria'
import RejillaProductos from '../../componentes/organismos/RejillaProductos'
import { listarCategorias } from '../../data/categorias'
import { listarProductos } from '../../data/productos'
import { useCarrito } from '../../hooks/useCarrito'
import { tieneOferta } from '../../utils/catalogo'

const BENEFICIOS = [
  {
    titulo: 'Garantía real',
    texto: 'Todos nuestros productos tienen entre 6 y 24 meses de garantía directa con la tienda.',
  },
  {
    titulo: 'Despacho a todo Chile',
    texto: 'Enviamos a las 16 regiones. Despacho gratis en compras sobre $100.000.',
  },
  {
    titulo: 'Asesoría antes de comprar',
    texto: 'Te ayudamos a elegir el equipo según tu presupuesto y el tipo de juego que prefieras.',
  },
]

function Home() {
  const { agregar } = useCarrito()
  const productos = listarProductos()
  const categorias = listarCategorias()
  const destacados = productos.filter(tieneOferta).slice(0, 4)

  return (
    <>
      <section className="zone-portada p-4 mb-4">
        <Row className="align-items-center g-4">
          <Col md={7}>
            <h1>Arma tu setup en The Zone</h1>
            <p>
              Teclados, mouse, monitores y todo lo que necesitas para jugar mejor. Productos con
              garantía y despacho a todo Chile.
            </p>
            <div className="d-flex gap-2">
              <Boton as={Link} to="/productos">
                Ver catálogo
              </Boton>
              <Boton variante="secundario" as={Link} to="/registro">
                Crear cuenta
              </Boton>
            </div>
          </Col>
          <Col md={5}>
            <img
              src={`${import.meta.env.BASE_URL}assets/img/portada.jpg`}
              alt="Equipo gamer con un notebook de la tienda"
              className="w-100"
            />
          </Col>
        </Row>
      </section>

      <section className="mb-5">
        <Titulo bajada="Encuentra lo que buscas según el tipo de producto.">Categorías</Titulo>
        <Row xs={1} sm={2} lg={4} className="g-3">
          {categorias.map((categoria) => (
            <Col key={categoria.id}>
              <TarjetaCategoria
                categoria={categoria}
                cantidad={productos.filter((item) => item.categoria === categoria.slug).length}
              />
            </Col>
          ))}
        </Row>
      </section>

      <section className="mb-5">
        <Titulo bajada="Los productos con descuento vigente de este mes.">
          Productos destacados
        </Titulo>
        <RejillaProductos productos={destacados} onAgregar={agregar} />
      </section>

      <section className="mb-5">
        <Titulo bajada="El equipo no te hace ganar, pero cuando la partida se define por milisegundos, deja de ser una excusa.">
          Periféricos a un precio criminal para un juego criminal
        </Titulo>
        <video className="zone-video" controls preload="metadata">
          <source src={`${import.meta.env.BASE_URL}assets/video/promo.mp4`} type="video/mp4" />
          Tu navegador no admite la reproducción de video.
        </video>
      </section>

      <section>
        <Titulo>Por qué comprar en The Zone</Titulo>
        <Row xs={1} md={3} className="g-3">
          {BENEFICIOS.map((beneficio) => (
            <Col key={beneficio.titulo}>
              <article className="zone-panel h-100">
                <h3 className="h6">{beneficio.titulo}</h3>
                <p className="mb-0">{beneficio.texto}</p>
              </article>
            </Col>
          ))}
        </Row>
      </section>
    </>
  )
}

export default Home
