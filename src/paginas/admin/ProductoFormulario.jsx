import { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Aviso from '../../componentes/atomos/Aviso'
import Boton from '../../componentes/atomos/Boton'
import Titulo from '../../componentes/atomos/Titulo'
import CampoFormulario from '../../componentes/moleculas/CampoFormulario'
import { listarCategorias } from '../../data/categorias'
import { actualizarProducto, crearProducto, obtenerProducto } from '../../data/productos'
import {
  hayErrores,
  validarPrecio,
  validarRequerido,
  validarStock,
} from '../../utils/validaciones'

const VACIO = {
  nombre: '',
  categoria: '',
  precio: '',
  oferta: '',
  stock: '',
  marca: 'Zone',
  garantia: '12 meses',
  imagen: '',
  descripcion: '',
}

function desdeProducto(producto) {
  return {
    nombre: producto.nombre,
    categoria: producto.categoria,
    precio: String(producto.precio),
    oferta: producto.oferta === null ? '' : String(producto.oferta),
    stock: String(producto.stock),
    marca: producto.marca,
    garantia: producto.garantia,
    imagen: producto.imagen,
    descripcion: producto.descripcion,
  }
}

function ProductoFormulario() {
  const { id } = useParams()
  const navegar = useNavigate()

  const existente = id === undefined ? null : obtenerProducto(id)
  const [datos, setDatos] = useState(() => (existente === null ? VACIO : desdeProducto(existente)))
  const [errores, setErrores] = useState({})
  const [resumen, setResumen] = useState(null)

  if (id !== undefined && existente === null) {
    return (
      <p className="text-muted">
        Ese producto no existe. <Link to="/admin/productos">Volver al listado</Link>.
      </p>
    )
  }

  function cambiar(campo, valor) {
    setDatos((actuales) => ({ ...actuales, [campo]: valor }))
  }

  function guardar(evento) {
    evento.preventDefault()

    const encontrados = {
      nombre: validarRequerido(datos.nombre, 'El nombre del producto es obligatorio.'),
      categoria: validarRequerido(datos.categoria, 'Elige la categoría del producto.'),
      precio: validarPrecio(datos.precio),
      stock: validarStock(datos.stock),
      descripcion: validarRequerido(datos.descripcion, 'Escribe una descripción del producto.'),
    }

    if (datos.oferta !== '' && Number(datos.oferta) >= Number(datos.precio)) {
      encontrados.oferta = 'El precio de oferta debe ser menor que el precio normal.'
    }

    setErrores(encontrados)

    if (hayErrores(encontrados)) {
      setResumen({ tono: 'error', texto: 'Revisa los campos marcados antes de guardar.' })
      return
    }

    if (existente === null) {
      crearProducto(datos)
    } else {
      actualizarProducto(existente.id, datos)
    }

    navegar('/admin/productos')
  }

  return (
    <>
      <Titulo
        nivel={1}
        bajada={
          existente === null
            ? 'Completa la ficha para sumarlo al catálogo.'
            : `Editando ${existente.nombre}.`
        }
      >
        {existente === null ? 'Nuevo producto' : 'Editar producto'}
      </Titulo>

      {resumen !== null && <Aviso tono={resumen.tono}>{resumen.texto}</Aviso>}

      <Form noValidate onSubmit={guardar} style={{ maxWidth: '48rem' }}>
        <CampoFormulario
          id="producto-nombre"
          etiqueta="Nombre"
          valor={datos.nombre}
          onCambiar={(valor) => cambiar('nombre', valor)}
          error={errores.nombre}
          requerido
        />

        <Row>
          <Col md={6}>
            <CampoFormulario
              id="producto-categoria"
              etiqueta="Categoría"
              tipo="select"
              valor={datos.categoria}
              onCambiar={(valor) => cambiar('categoria', valor)}
              error={errores.categoria}
              opciones={listarCategorias().map((categoria) => ({
                valor: categoria.slug,
                texto: categoria.nombre,
              }))}
              marcador="Selecciona una categoría"
              requerido
            />
          </Col>
          <Col md={6}>
            <CampoFormulario
              id="producto-marca"
              etiqueta="Marca"
              valor={datos.marca}
              onCambiar={(valor) => cambiar('marca', valor)}
            />
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <CampoFormulario
              id="producto-precio"
              etiqueta="Precio"
              tipo="number"
              valor={datos.precio}
              onCambiar={(valor) => cambiar('precio', valor)}
              error={errores.precio}
              requerido
            />
          </Col>
          <Col md={4}>
            <CampoFormulario
              id="producto-oferta"
              etiqueta="Precio de oferta (opcional)"
              tipo="number"
              valor={datos.oferta}
              onCambiar={(valor) => cambiar('oferta', valor)}
              error={errores.oferta}
              ayuda="Déjalo vacío si el producto no está en oferta."
            />
          </Col>
          <Col md={4}>
            <CampoFormulario
              id="producto-stock"
              etiqueta="Stock"
              tipo="number"
              valor={datos.stock}
              onCambiar={(valor) => cambiar('stock', valor)}
              error={errores.stock}
              requerido
            />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <CampoFormulario
              id="producto-garantia"
              etiqueta="Garantía"
              valor={datos.garantia}
              onCambiar={(valor) => cambiar('garantia', valor)}
            />
          </Col>
          <Col md={6}>
            <CampoFormulario
              id="producto-imagen"
              etiqueta="Ruta de la imagen"
              valor={datos.imagen}
              onCambiar={(valor) => cambiar('imagen', valor)}
              ayuda="Ej: /assets/img/teclado.jpg"
            />
          </Col>
        </Row>

        <CampoFormulario
          id="producto-descripcion"
          etiqueta="Descripción"
          tipo="textarea"
          valor={datos.descripcion}
          onCambiar={(valor) => cambiar('descripcion', valor)}
          error={errores.descripcion}
          requerido
        />

        <div className="d-flex gap-2">
          <Boton tipo="submit">{existente === null ? 'Crear producto' : 'Guardar cambios'}</Boton>
          <Boton variante="neutro" as={Link} to="/admin/productos">
            Cancelar
          </Boton>
        </div>
      </Form>
    </>
  )
}

export default ProductoFormulario
