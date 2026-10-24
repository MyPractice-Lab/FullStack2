import Alert from 'react-bootstrap/Alert'

const TONOS = {
  exito: 'success',
  error: 'danger',
  info: 'secondary',
  aviso: 'warning',
}

function Aviso({ children, tono = 'info', onCerrar = null }) {
  if (!children) {
    return null
  }

  return (
    <Alert
      variant={TONOS[tono] ?? TONOS.info}
      role="status"
      dismissible={onCerrar !== null}
      onClose={onCerrar ?? undefined}
    >
      {children}
    </Alert>
  )
}

export default Aviso
