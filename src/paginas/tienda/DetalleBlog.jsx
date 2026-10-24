import { Link, useParams } from 'react-router-dom'
import { obtenerEntrada } from '../../data/blog'
import { formatearFecha } from '../../utils/formato'

function DetalleBlog() {
  const { slug } = useParams()
  const entrada = obtenerEntrada(slug)

  if (entrada === null) {
    return (
      <p className="text-muted">
        Esa entrada no existe. <Link to="/blog">Volver al blog</Link>.
      </p>
    )
  }

  return (
    <article className="mx-auto" style={{ maxWidth: '45rem' }}>
      <h1 className="zone-titulo h3">{entrada.titulo}</h1>
      <time dateTime={entrada.fecha} className="small text-muted d-block mb-3">
        {formatearFecha(entrada.fecha)}
      </time>

      <p className="fw-bold">{entrada.resumen}</p>

      {entrada.cuerpo.map((parrafo) => (
        <p key={parrafo.slice(0, 24)}>{parrafo}</p>
      ))}

      <Link to="/blog">Volver al blog</Link>
    </article>
  )
}

export default DetalleBlog
