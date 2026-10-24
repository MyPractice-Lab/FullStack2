import { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Boton from '../../componentes/atomos/Boton'
import Titulo from '../../componentes/atomos/Titulo'
import CampoFormulario from '../../componentes/moleculas/CampoFormulario'
import { comunasDe, regionesChile } from '../../data/regiones'
import {
  actualizarUsuario,
  crearUsuario,
  obtenerUsuario,
  obtenerUsuarioPorCorreo,
} from '../../data/usuarios'
import {
  hayErrores,
  sugerenciaCorreo,
  validarClave,
  validarCorreo,
  validarNombre,
  validarRequerido,
} from '../../utils/validaciones'

const ROLES = [
  { valor: 'cliente', texto: 'Cliente' },
  { valor: 'administrador', texto: 'Administrador' },
]

function UsuarioFormulario() {
  const { id } = useParams()
  const navegar = useNavigate()

  const existente = id === undefined ? null : obtenerUsuario(id)
  const [datos, setDatos] = useState(() =>
    existente === null
      ? { nombre: '', correo: '', clave: '', rol: 'cliente', region: '', comuna: '', calle: '', activo: true }
      : { ...existente, clave: '' },
  )
  const [errores, setErrores] = useState({})

  if (id !== undefined && existente === null) {
    return (
      <p className="text-muted">
        Ese usuario no existe. <Link to="/admin/usuarios">Volver al listado</Link>.
      </p>
    )
  }

  function cambiar(campo, valor) {
    setDatos((actuales) => {
      if (campo === 'region') {
        return { ...actuales, region: valor, comuna: '' }
      }

      return { ...actuales, [campo]: valor }
    })
  }

  function guardar(evento) {
    evento.preventDefault()

    const encontrados = {
      nombre: validarNombre(datos.nombre),
      correo: validarCorreo(datos.correo),
      rol: validarRequerido(datos.rol, 'Elige el rol de la cuenta.'),
      clave: existente === null || datos.clave !== '' ? validarClave(datos.clave) : null,
    }

    if (encontrados.correo === null) {
      const duplicado = obtenerUsuarioPorCorreo(datos.correo)

      if (duplicado !== null && duplicado.id !== existente?.id) {
        encontrados.correo = 'Ya existe otra cuenta con ese correo.'
      }
    }

    setErrores(encontrados)

    if (hayErrores(encontrados)) {
      return
    }

    if (existente === null) {
      crearUsuario(datos)
    } else {
      const cambios = { ...datos }

      if (cambios.clave === '') {
        delete cambios.clave
      }

      actualizarUsuario(existente.id, cambios)
    }

    navegar('/admin/usuarios')
  }

  return (
    <>
      <Titulo
        nivel={1}
        bajada={existente === null ? 'Crea una cuenta desde la administración.' : `Editando ${existente.nombre}.`}
      >
        {existente === null ? 'Nuevo usuario' : 'Editar usuario'}
      </Titulo>

      <Form noValidate onSubmit={guardar} style={{ maxWidth: '44rem' }}>
        <CampoFormulario
          id="usuario-nombre"
          etiqueta="Nombre completo"
          valor={datos.nombre}
          onCambiar={(valor) => cambiar('nombre', valor)}
          error={errores.nombre}
          requerido
        />

        <Row>
          <Col md={7}>
            <CampoFormulario
              id="usuario-correo"
              etiqueta="Correo electrónico"
              tipo="email"
              valor={datos.correo}
              onCambiar={(valor) => cambiar('correo', valor)}
              error={errores.correo}
              sugerencia={sugerenciaCorreo(datos.correo)}
              onAceptarSugerencia={(valor) => cambiar('correo', valor)}
              requerido
            />
          </Col>
          <Col md={5}>
            <CampoFormulario
              id="usuario-rol"
              etiqueta="Rol"
              tipo="select"
              valor={datos.rol}
              onCambiar={(valor) => cambiar('rol', valor)}
              error={errores.rol}
              opciones={ROLES}
              marcador="Selecciona un rol"
              requerido
            />
          </Col>
        </Row>

        <CampoFormulario
          id="usuario-clave"
          etiqueta="Contraseña"
          tipo="password"
          valor={datos.clave}
          onCambiar={(valor) => cambiar('clave', valor)}
          error={errores.clave}
          ayuda={
            existente === null
              ? 'Mínimo 8 caracteres, con un número y una mayúscula.'
              : 'Déjala vacía para conservar la contraseña actual.'
          }
          requerido={existente === null}
        />

        <CampoFormulario
          id="usuario-calle"
          etiqueta="Calle y número"
          valor={datos.calle}
          onCambiar={(valor) => cambiar('calle', valor)}
        />

        <Row>
          <Col md={6}>
            <CampoFormulario
              id="usuario-region"
              etiqueta="Región"
              tipo="select"
              valor={datos.region}
              onCambiar={(valor) => cambiar('region', valor)}
              opciones={regionesChile.map((region) => ({
                valor: region.nombre,
                texto: region.nombre,
              }))}
              marcador="Selecciona una región"
            />
          </Col>
          <Col md={6}>
            <CampoFormulario
              id="usuario-comuna"
              etiqueta="Comuna"
              tipo="select"
              valor={datos.comuna}
              onCambiar={(valor) => cambiar('comuna', valor)}
              opciones={comunasDe(datos.region).map((comuna) => ({
                valor: comuna,
                texto: comuna,
              }))}
              marcador="Selecciona una comuna"
              deshabilitado={!datos.region}
            />
          </Col>
        </Row>

        <CampoFormulario
          id="usuario-activo"
          etiqueta="Cuenta activa"
          tipo="checkbox"
          valor={datos.activo}
          onCambiar={(valor) => cambiar('activo', valor)}
        />

        <div className="d-flex gap-2">
          <Boton tipo="submit">{existente === null ? 'Crear usuario' : 'Guardar cambios'}</Boton>
          <Boton variante="neutro" as={Link} to="/admin/usuarios">
            Cancelar
          </Boton>
        </div>
      </Form>
    </>
  )
}

export default UsuarioFormulario
