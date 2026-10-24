import { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'
import Aviso from '../../componentes/atomos/Aviso'
import Boton from '../../componentes/atomos/Boton'
import Titulo from '../../componentes/atomos/Titulo'
import CampoFormulario from '../../componentes/moleculas/CampoFormulario'
import { comunasDe, regionesChile } from '../../data/regiones'
import { crearUsuario, obtenerUsuarioPorCorreo } from '../../data/usuarios'
import {
  hayErrores,
  sugerenciaCorreo,
  validarClave,
  validarCorreo,
  validarNombre,
  validarRepetirClave,
  validarRequerido,
} from '../../utils/validaciones'

const INICIAL = {
  nombre: '',
  correo: '',
  clave: '',
  repetir: '',
  region: '',
  comuna: '',
  terminos: false,
}

function Registro() {
  const navegar = useNavigate()
  const [datos, setDatos] = useState(INICIAL)
  const [errores, setErrores] = useState({})
  const [resumen, setResumen] = useState(null)

  function cambiar(campo, valor) {
    setDatos((actuales) => {
      if (campo === 'region') {
        return { ...actuales, region: valor, comuna: '' }
      }

      return { ...actuales, [campo]: valor }
    })
  }

  function enviar(evento) {
    evento.preventDefault()

    const encontrados = {
      nombre: validarNombre(datos.nombre),
      correo: validarCorreo(datos.correo),
      clave: validarClave(datos.clave),
      repetir: validarRepetirClave(datos.clave, datos.repetir),
      region: validarRequerido(datos.region, 'Selecciona tu región para calcular el despacho.'),
      comuna: validarRequerido(datos.comuna, 'Selecciona tu comuna.'),
      terminos: datos.terminos
        ? null
        : 'Debes aceptar los términos y condiciones para crear la cuenta.',
    }

    if (encontrados.correo === null && obtenerUsuarioPorCorreo(datos.correo) !== null) {
      encontrados.correo = 'Ya existe una cuenta registrada con ese correo.'
    }

    setErrores(encontrados)

    if (hayErrores(encontrados)) {
      setResumen({
        tono: 'error',
        texto: 'No pudimos crear la cuenta. Revisa los campos marcados.',
      })
      return
    }

    crearUsuario({
      nombre: datos.nombre.trim(),
      correo: datos.correo,
      clave: datos.clave,
      region: datos.region,
      comuna: datos.comuna,
    })

    setDatos(INICIAL)
    setResumen({ tono: 'exito', texto: 'Cuenta creada correctamente. Ya puedes iniciar sesión.' })
    setTimeout(() => navegar('/login'), 1200)
  }

  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Titulo nivel={1} bajada="Crea tu cuenta para comprar más rápido la próxima vez.">
          Crear cuenta
        </Titulo>

        {resumen !== null && <Aviso tono={resumen.tono}>{resumen.texto}</Aviso>}

        <Form noValidate onSubmit={enviar}>
          <CampoFormulario
            id="registro-nombre"
            etiqueta="Nombre completo"
            valor={datos.nombre}
            onCambiar={(valor) => cambiar('nombre', valor)}
            error={errores.nombre}
            autocompletar="name"
            requerido
          />

          <CampoFormulario
            id="registro-correo"
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

          <Row>
            <Col md={6}>
              <CampoFormulario
                id="registro-clave"
                etiqueta="Contraseña"
                tipo="password"
                valor={datos.clave}
                onCambiar={(valor) => cambiar('clave', valor)}
                error={errores.clave}
                ayuda="Mínimo 8 caracteres, con un número y una mayúscula."
                autocompletar="new-password"
                requerido
              />
            </Col>
            <Col md={6}>
              <CampoFormulario
                id="registro-repetir"
                etiqueta="Repetir contraseña"
                tipo="password"
                valor={datos.repetir}
                onCambiar={(valor) => cambiar('repetir', valor)}
                error={errores.repetir}
                autocompletar="new-password"
                requerido
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <CampoFormulario
                id="registro-region"
                etiqueta="Región"
                tipo="select"
                valor={datos.region}
                onCambiar={(valor) => cambiar('region', valor)}
                error={errores.region}
                opciones={regionesChile.map((region) => ({
                  valor: region.nombre,
                  texto: region.nombre,
                }))}
                marcador="Selecciona una región"
                requerido
              />
            </Col>
            <Col md={6}>
              <CampoFormulario
                id="registro-comuna"
                etiqueta="Comuna"
                tipo="select"
                valor={datos.comuna}
                onCambiar={(valor) => cambiar('comuna', valor)}
                error={errores.comuna}
                opciones={comunasDe(datos.region).map((comuna) => ({
                  valor: comuna,
                  texto: comuna,
                }))}
                marcador="Selecciona una comuna"
                deshabilitado={datos.region === ''}
                requerido
              />
            </Col>
          </Row>

          <CampoFormulario
            id="registro-terminos"
            etiqueta="Acepto los términos y condiciones de la tienda"
            tipo="checkbox"
            valor={datos.terminos}
            onCambiar={(valor) => cambiar('terminos', valor)}
            error={errores.terminos}
          />

          <Boton tipo="submit" bloque>
            Crear cuenta
          </Boton>
        </Form>
      </Col>
    </Row>
  )
}

export default Registro
