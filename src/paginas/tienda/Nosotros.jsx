import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Titulo from '../../componentes/atomos/Titulo'
import FichaTecnica from '../../componentes/moleculas/FichaTecnica'

function Nosotros() {
  return (
    <>
      <Titulo nivel={1} bajada="Una tienda nacida entre jugadores, para jugadores.">
        Sobre The Zone
      </Titulo>

      <Row className="g-4">
        <Col md={7} as="article">
          <h2 className="h5">Nuestra historia</h2>
          <p>
            The Zone nació en 2023 como un emprendimiento de tres estudiantes que vendían
            periféricos a sus compañeros de universidad. Los pedidos se tomaban por WhatsApp y por
            correo, y el registro se llevaba en una planilla de cálculo.
          </p>
          <p>
            Al crecer la cantidad de clientes, ese sistema dejó de funcionar: se perdían pedidos y
            era imposible hacer seguimiento. Por eso decidimos construir una tienda en línea que
            centralizara todo en un solo lugar.
          </p>

          <h2 className="h5">Qué nos diferencia</h2>
          <ul>
            <li>Probamos cada producto antes de agregarlo al catálogo.</li>
            <li>Damos asesoría según el presupuesto de cada cliente.</li>
            <li>Respondemos las consultas dentro de 24 horas hábiles.</li>
            <li>Trabajamos con garantía directa de tienda.</li>
          </ul>
        </Col>

        <Col md={5}>
          <div className="zone-panel mb-3">
            <h3 className="h6">La tienda en números</h3>
            <FichaTecnica
              titulo="Resumen de la tienda"
              filas={[
                { campo: 'Año de creación', valor: '2023' },
                { campo: 'Clientes atendidos', valor: 'Más de 1.200' },
                { campo: 'Regiones con despacho', valor: '16' },
                { campo: 'Categorías', valor: '4' },
              ]}
            />
          </div>

          <div className="zone-panel">
            <h3 className="h6">Enlaces de interés</h3>
            <ul className="mb-0">
              <li>
                <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
                  MDN Web Docs
                </a>
              </li>
              <li>
                <a href="https://www.sernac.cl" target="_blank" rel="noopener noreferrer">
                  SERNAC - Derechos del consumidor
                </a>
              </li>
              <li>
                <a href="https://www.chileatiende.gob.cl" target="_blank" rel="noopener noreferrer">
                  ChileAtiende
                </a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Nosotros
