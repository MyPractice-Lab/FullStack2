import { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Aviso from '../../componentes/atomos/Aviso'
import Boton from '../../componentes/atomos/Boton'
import Titulo from '../../componentes/atomos/Titulo'
import CampoFormulario from '../../componentes/moleculas/CampoFormulario'
import {
  hayErrores,
  sugerenciaCorreo,
  validarConsulta,
  validarCorreo,
  validarNombre,
  validarRequerido,
} from '../../utils/validaciones'

const ASUNTOS = [
  { valor: 'compra', texto: 'Consulta por una compra' },
  { valor: 'producto', texto: 'Consulta por un producto' },
  { valor: 'garantia', texto: 'Garantía o servicio técnico' },
  { valor: 'otro', texto: 'Otro tema' },
]

const INICIAL = { nombre: '', correo: '', asunto: '', mensaje: '' }

function Contacto() {
  const [datos, setDatos] = useState(INICIAL)
  const [errores, setErrores] = useState({})
  const [resumen, setResumen] = useState(null)

  function cambiar(campo, valor) {
    setDatos((actuales) => ({ ...actuales, [campo]: valor }))
  }

  function enviar(evento) {
    evento.preventDefault()

    const encontrados = {
      nombre: validarNombre(datos.nombre),
      correo: validarCorreo(datos.correo),
      asunto: validarRequerido(datos.asunto, 'Elige el motivo de tu consulta.'),
      mensaje: validarConsulta(datos.mensaje),
    }

    setErrores(encontrados)

    if (hayErrores(encontrados)) {
      setResumen({ tono: 'error', texto: 'No pudimos enviar el mensaje. Revisa los campos marcados.' })
      return
    }

    setResumen({
      tono: 'exito',
      texto: 'Mensaje enviado. Te respondemos dentro de 24 horas hábiles.',
    })
    setDatos(INICIAL)
  }

  return (
    <>
      <Titulo nivel={1} bajada="Escríbenos y te respondemos dentro de 24 horas hábiles.">
        Contacto
      </Titulo>

      <Row className="g-4">
        <Col md={7}>
          {resumen !== null && <Aviso tono={resumen.tono}>{resumen.texto}</Aviso>}

          <Form noValidate onSubmit={enviar}>
            <CampoFormulario
              id="contacto-nombre"
              etiqueta="Nombre completo"
              valor={datos.nombre}
              onCambiar={(valor) => cambiar('nombre', valor)}
              error={errores.nombre}
              autocompletar="name"
              requerido
            />

            <CampoFormulario
              id="contacto-correo"
              etiqueta="Correo electrónico"
              tipo="email"
              valor={datos.correo}
              onCambiar={(valor) => cambiar('correo', valor)}
              error={errores.correo}
              autocompletar="email"
              sugerencia={sugerenciaCorreo(datos.correo)}
              onAceptarSugerencia={(valor) => cambiar('correo', valor)}
              requerido
            />

            <CampoFormulario
              id="contacto-asunto"
              etiqueta="Motivo"
              tipo="select"
              valor={datos.asunto}
              onCambiar={(valor) => cambiar('asunto', valor)}
              error={errores.asunto}
              opciones={ASUNTOS}
              marcador="Selecciona un motivo"
              requerido
            />

            <CampoFormulario
              id="contacto-mensaje"
              etiqueta="Mensaje"
              tipo="textarea"
              valor={datos.mensaje}
              onCambiar={(valor) => cambiar('mensaje', valor)}
              error={errores.mensaje}
              ayuda="Mínimo 10 caracteres."
              requerido
            />

            <Boton tipo="submit">Enviar mensaje</Boton>
          </Form>
        </Col>

        <Col md={5}>
          <div className="zone-panel">
            <h2 className="h6">Otros canales</h2>
            <ul className="list-unstyled mb-0">
              <li>Av. Providencia 1234, Santiago</li>
              <li>+56 2 2345 6789</li>
              <li>
                <a href="mailto:contacto@thezone.cl">contacto@thezone.cl</a>
              </li>
              <li>Lunes a viernes de 9:00 a 19:00</li>
            </ul>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Contacto
