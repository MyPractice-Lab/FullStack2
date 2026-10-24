import Badge from 'react-bootstrap/Badge'

const TONOS = {
  neutro: 'secondary',
  oferta: 'danger',
  exito: 'success',
  aviso: 'warning',
  info: 'info',
}

function Etiqueta({ children, tono = 'neutro' }) {
  return <Badge bg={TONOS[tono] ?? TONOS.neutro}>{children}</Badge>
}

export default Etiqueta
