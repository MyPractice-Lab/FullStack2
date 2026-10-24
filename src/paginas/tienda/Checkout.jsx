import { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { Navigate, useNavigate } from 'react-router-dom'
import Aviso from '../../componentes/atomos/Aviso'
import Boton from '../../componentes/atomos/Boton'
import Titulo from '../../componentes/atomos/Titulo'
import CampoFormulario from '../../componentes/moleculas/CampoFormulario'
import ResumenTotales from '../../componentes/moleculas/ResumenTotales'
import TablaResumenOrden from '../../componentes/organismos/TablaResumenOrden'
import { crearOrden } from '../../data/ordenes'
import { descontarStock } from '../../data/productos'
import { comunasDe, regionesChile } from '../../data/regiones'
import { useCarrito } from '../../hooks/useCarrito'
import { useSesion } from '../../hooks/useSesion'
import { formatearPrecio } from '../../utils/formato'
import { hayErrores, sugerenciaCorreo, validarCorreo, validarRequerido } from '../../utils/validaciones'

function datosIniciales(usuario) {
  if (usuario === null) {
    return {
      nombre: '',
      apellidos: '',
      correo: '',
      calle: '',
      departamento: '',
      region: '',
      comuna: '',
      indicaciones: '',
    }
  }

  const partes = usuario.nombre.split(' ')

  return {
    nombre: partes[0] ?? '',
    apellidos: partes.slice(1).join(' '),
    correo: usuario.correo,
    calle: usuario.calle ?? '',
    departamento: '',
    region: usuario.region ?? '',
    comuna: usuario.comuna ?? '',
    indicaciones: '',
  }
}

function Checkout() {
  const { detalle, totales, vaciar } = useCarrito()
  const { usuario } = useSesion()
  const navegar = useNavigate()

  const [datos, setDatos] = useState(() => datosIniciales(usuario))
  const [errores, setErrores] = useState({})
  const [resultadoPago, setResultadoPago] = useState('aprobado')
  const [pagoEnviado, setPagoEnviado] = useState(false)

  if (detalle.length === 0 && pagoEnviado === false) {
    return <Navigate to="/carrito" replace />
  }

  function cambiar(campo, valor) {
    setDatos((actuales) => {
      if (campo === 'region') {
        return { ...actuales, region: valor, comuna: '' }
      }

      return { ...actuales, [campo]: valor }
    })
  }

  function pagar(evento) {
    evento.preventDefault()

    const encontrados = {
      nombre: validarRequerido(datos.nombre, 'El nombre es obligatorio.'),
      apellidos: validarRequerido(datos.apellidos, 'Los apellidos son obligatorios.'),
      correo: validarCorreo(datos.correo),
      calle: validarRequerido(datos.calle, 'La calle y el número son obligatorios.'),
      region: validarRequerido(datos.region, 'Selecciona la región de entrega.'),
      comuna: validarRequerido(datos.comuna, 'Selecciona la comuna de entrega.'),
    }

    setErrores(encontrados)

    if (hayErrores(encontrados)) {
      return
    }

    const aprobado = resultadoPago === 'aprobado'

    const orden = crearOrden({
      estado: aprobado ? 'pagada' : 'rechazada',
      usuarioId: usuario?.id ?? null,
      cliente: {
        nombre: datos.nombre.trim(),
        apellidos: datos.apellidos.trim(),
        correo: datos.correo.trim(),
      },
      direccion: {
        calle: datos.calle.trim(),
        departamento: datos.departamento.trim(),
        region: datos.region,
        comuna: datos.comuna,
        indicaciones: datos.indicaciones.trim(),
      },
      lineas: detalle,
      totales,
    })

    setPagoEnviado(true)

    if (aprobado) {
      descontarStock(detalle)
      vaciar()
      navegar(`/pago/exitoso/${orden.codigo}`)
      return
    }

    navegar(`/pago/rechazado/${orden.codigo}`)
  }

  return (
    <Row className="justify-content-center">
      <Col lg={9}>
        <Titulo nivel={1} bajada="Completa tus datos y la dirección de entrega.">
          Carrito de compra
        </Titulo>

        {usuario !== null && (
          <Aviso tono="info">
            Como iniciaste sesión, completamos tus datos automáticamente. Puedes cambiarlos si esta
            compra va a otra dirección.
          </Aviso>
        )}

        <TablaResumenOrden lineas={detalle} />

        <Row className="g-4">
          <Col md={7}>
            <Form noValidate onSubmit={pagar}>
              <h2 className="h6">Información del cliente</h2>
              <Row>
                <Col md={6}>
                  <CampoFormulario
                    id="checkout-nombre"
                    etiqueta="Nombre"
                    valor={datos.nombre}
                    onCambiar={(valor) => cambiar('nombre', valor)}
                    error={errores.nombre}
                    autocompletar="given-name"
                    requerido
                  />
                </Col>
                <Col md={6}>
                  <CampoFormulario
                    id="checkout-apellidos"
                    etiqueta="Apellidos"
                    valor={datos.apellidos}
                    onCambiar={(valor) => cambiar('apellidos', valor)}
                    error={errores.apellidos}
                    autocompletar="family-name"
                    requerido
                  />
                </Col>
              </Row>

              <CampoFormulario
                id="checkout-correo"
                etiqueta="Correo"
                tipo="email"
                valor={datos.correo}
                onCambiar={(valor) => cambiar('correo', valor)}
                error={errores.correo}
                autocompletar="email"
                sugerencia={sugerenciaCorreo(datos.correo)}
                onAceptarSugerencia={(valor) => cambiar('correo', valor)}
                requerido
              />

              <h2 className="h6">Dirección de entrega de los productos</h2>
              <Row>
                <Col md={7}>
                  <CampoFormulario
                    id="checkout-calle"
                    etiqueta="Calle"
                    valor={datos.calle}
                    onCambiar={(valor) => cambiar('calle', valor)}
                    error={errores.calle}
                    autocompletar="street-address"
                    requerido
                  />
                </Col>
                <Col md={5}>
                  <CampoFormulario
                    id="checkout-departamento"
                    etiqueta="Departamento (opcional)"
                    valor={datos.departamento}
                    onCambiar={(valor) => cambiar('departamento', valor)}
                    marcador="Ej: 603"
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <CampoFormulario
                    id="checkout-region"
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
                    id="checkout-comuna"
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
                id="checkout-indicaciones"
                etiqueta="Indicaciones para la entrega (opcional)"
                tipo="textarea"
                filas={3}
                valor={datos.indicaciones}
                onCambiar={(valor) => cambiar('indicaciones', valor)}
                marcador="Ej: Entre calles, color del edificio, no tiene timbre."
              />

              <fieldset className="zone-panel mb-3">
                <legend className="h6">Simulación de la pasarela de pago</legend>
                <Form.Check
                  type="radio"
                  id="pago-aprobado"
                  name="resultado-pago"
                  label="Pago aprobado"
                  checked={resultadoPago === 'aprobado'}
                  onChange={() => setResultadoPago('aprobado')}
                />
                <Form.Check
                  type="radio"
                  id="pago-rechazado"
                  name="resultado-pago"
                  label="Pago rechazado por el banco"
                  checked={resultadoPago === 'rechazado'}
                  onChange={() => setResultadoPago('rechazado')}
                />
                <Form.Text className="text-muted">
                  El proyecto es solo frontend: esta opción reemplaza la respuesta real de la
                  pasarela para poder probar los dos caminos.
                </Form.Text>
              </fieldset>

              <Boton tipo="submit" variante="exito" bloque>
                Pagar ahora {formatearPrecio(totales.total)}
              </Boton>
            </Form>
          </Col>

          <Col md={5}>
            <div className="zone-panel">
              <h2 className="h6">Total a pagar</h2>
              <ResumenTotales totales={totales} />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Checkout
