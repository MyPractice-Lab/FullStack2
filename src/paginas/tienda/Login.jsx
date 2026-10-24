import { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { Link, useNavigate } from 'react-router-dom'
import Aviso from '../../componentes/atomos/Aviso'
import Boton from '../../componentes/atomos/Boton'
import Titulo from '../../componentes/atomos/Titulo'
import CampoFormulario from '../../componentes/moleculas/CampoFormulario'
import { useSesion } from '../../hooks/useSesion'
import { hayErrores, sugerenciaCorreo, validarCorreo, validarRequerido } from '../../utils/validaciones'

function Login() {
  const { iniciarSesion } = useSesion()
  const navegar = useNavigate()

  const [datos, setDatos] = useState({ correo: '', clave: '' })
  const [errores, setErrores] = useState({})
  const [rechazo, setRechazo] = useState(null)

  function cambiar(campo, valor) {
    setDatos((actuales) => ({ ...actuales, [campo]: valor }))
  }

  function enviar(evento) {
    evento.preventDefault()
    setRechazo(null)

    const encontrados = {
      correo: validarCorreo(datos.correo),
      clave: validarRequerido(datos.clave, 'La contraseña es obligatoria.'),
    }

    setErrores(encontrados)

    if (hayErrores(encontrados)) {
      return
    }

    const resultado = iniciarSesion(datos.correo, datos.clave)

    if (resultado.ok === false) {
      setRechazo(resultado.motivo)
      return
    }

    navegar(resultado.usuario.rol === 'administrador' ? '/admin' : '/')
  }

  return (
    <Row className="justify-content-center">
      <Col md={6} lg={5}>
        <Titulo nivel={1} bajada="Entra con la cuenta que creaste en la tienda.">
          Iniciar sesión
        </Titulo>

        {rechazo !== null && <Aviso tono="error">{rechazo}</Aviso>}

        <Form noValidate onSubmit={enviar}>
          <CampoFormulario
            id="login-correo"
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
            id="login-clave"
            etiqueta="Contraseña"
            tipo="password"
            valor={datos.clave}
            onCambiar={(valor) => cambiar('clave', valor)}
            error={errores.clave}
            autocompletar="current-password"
            requerido
          />

          <Boton tipo="submit" bloque>
            Entrar
          </Boton>
        </Form>

        <p className="small mt-3">
          ¿Todavía no tienes cuenta? <Link to="/registro">Créala aquí</Link>.
        </p>

        <div className="zone-panel small">
          <p className="mb-1 fw-bold">Cuentas de prueba</p>
          <p className="mb-0">Administrador: admin@thezone.cl / Admin123</p>
          <p className="mb-0">Cliente: pedro@example.com / Cliente123</p>
        </div>
      </Col>
    </Row>
  )
}

export default Login
