import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Boton from '../atomos/Boton'

function Buscador() {
  const [texto, setTexto] = useState('')
  const navegar = useNavigate()

  function buscar(evento) {
    evento.preventDefault()
    navegar(`/productos?buscar=${encodeURIComponent(texto.trim())}`)
  }

  return (
    <Form className="d-flex" role="search" onSubmit={buscar}>
      <InputGroup>
        <Form.Control
          type="search"
          value={texto}
          onChange={(evento) => setTexto(evento.target.value)}
          placeholder="Buscar"
          aria-label="Buscar productos"
        />
        <Boton variante="secundario" tipo="submit">
          Buscar
        </Boton>
      </InputGroup>
    </Form>
  )
}

export default Buscador
