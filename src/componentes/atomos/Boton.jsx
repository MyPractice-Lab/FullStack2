import Button from 'react-bootstrap/Button'

const VARIANTES = {
  primario: 'primary',
  secundario: 'outline-primary',
  neutro: 'outline-secondary',
  peligro: 'danger',
  exito: 'success',
}

function Boton({
  children,
  variante = 'primario',
  tipo = 'button',
  onClick,
  deshabilitado = false,
  bloque = false,
  tamano,
  ...resto
}) {
  return (
    <Button
      variant={VARIANTES[variante] ?? VARIANTES.primario}
      type={tipo}
      onClick={onClick}
      disabled={deshabilitado}
      size={tamano}
      className={bloque ? 'w-100' : undefined}
      {...resto}
    >
      {children}
    </Button>
  )
}

export default Boton
