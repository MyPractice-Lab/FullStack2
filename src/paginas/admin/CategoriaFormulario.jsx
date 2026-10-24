import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Boton from '../../componentes/atomos/Boton'
import Titulo from '../../componentes/atomos/Titulo'
import CampoFormulario from '../../componentes/moleculas/CampoFormulario'
import {
  actualizarCategoria,
  crearCategoria,
  obtenerCategoriaPorId,
} from '../../data/categorias'
import { hayErrores, validarRequerido } from '../../utils/validaciones'

function CategoriaFormulario() {
  const { id } = useParams()
  const navegar = useNavigate()

  const existente = id === undefined ? null : obtenerCategoriaPorId(id)
  const [datos, setDatos] = useState(() =>
    existente === null
      ? { nombre: '', descripcion: '', imagen: '' }
      : {
          nombre: existente.nombre,
          descripcion: existente.descripcion,
          imagen: existente.imagen,
        },
  )
  const [errores, setErrores] = useState({})

  if (id !== undefined && existente === null) {
    return (
      <p className="text-muted">
        Esa categoría no existe. <Link to="/admin/categorias">Volver al listado</Link>.
      </p>
    )
  }

  function cambiar(campo, valor) {
    setDatos((actuales) => ({ ...actuales, [campo]: valor }))
  }

  function guardar(evento) {
    evento.preventDefault()

    const encontrados = {
      nombre: validarRequerido(datos.nombre, 'El nombre de la categoría es obligatorio.'),
      descripcion: validarRequerido(datos.descripcion, 'Escribe una descripción breve.'),
    }

    setErrores(encontrados)

    if (hayErrores(encontrados)) {
      return
    }

    if (existente === null) {
      crearCategoria(datos)
    } else {
      actualizarCategoria(existente.id, datos)
    }

    navegar('/admin/categorias')
  }

  return (
    <>
      <Titulo nivel={1} bajada={existente === null ? 'Agrupa productos bajo un nuevo nombre.' : `Editando ${existente.nombre}.`}>
        {existente === null ? 'Nueva categoría' : 'Editar categoría'}
      </Titulo>

      <Form noValidate onSubmit={guardar} style={{ maxWidth: '40rem' }}>
        <CampoFormulario
          id="categoria-nombre"
          etiqueta="Nombre"
          valor={datos.nombre}
          onCambiar={(valor) => cambiar('nombre', valor)}
          error={errores.nombre}
          requerido
        />

        <CampoFormulario
          id="categoria-descripcion"
          etiqueta="Descripción"
          tipo="textarea"
          filas={3}
          valor={datos.descripcion}
          onCambiar={(valor) => cambiar('descripcion', valor)}
          error={errores.descripcion}
          requerido
        />

        <CampoFormulario
          id="categoria-imagen"
          etiqueta="Ruta de la imagen"
          valor={datos.imagen}
          onCambiar={(valor) => cambiar('imagen', valor)}
          ayuda="Ej: /assets/img/teclado.jpg"
        />

        <div className="d-flex gap-2">
          <Boton tipo="submit">{existente === null ? 'Crear categoría' : 'Guardar cambios'}</Boton>
          <Boton variante="neutro" as={Link} to="/admin/categorias">
            Cancelar
          </Boton>
        </div>
      </Form>
    </>
  )
}

export default CategoriaFormulario
