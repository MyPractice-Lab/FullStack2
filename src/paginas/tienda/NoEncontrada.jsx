import { Link } from 'react-router-dom'
import Titulo from '../../componentes/atomos/Titulo'

function NoEncontrada() {
  return (
    <>
      <Titulo nivel={1} bajada="La dirección que escribiste no corresponde a ninguna vista.">
        Página no encontrada
      </Titulo>
      <p>
        Puedes volver al <Link to="/">inicio</Link> o revisar el{' '}
        <Link to="/productos">catálogo</Link>.
      </p>
    </>
  )
}

export default NoEncontrada
