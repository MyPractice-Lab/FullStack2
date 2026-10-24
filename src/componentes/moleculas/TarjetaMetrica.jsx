import Card from 'react-bootstrap/Card'

function TarjetaMetrica({ titulo, valor, detalle, color = 'primary' }) {
  return (
    <Card bg={color} text="white" className="h-100">
      <Card.Body>
        <Card.Subtitle className="mb-2">{titulo}</Card.Subtitle>
        <p className="h3 mb-1">{valor}</p>
        {detalle && <p className="small mb-0">{detalle}</p>}
      </Card.Body>
    </Card>
  )
}

export default TarjetaMetrica
