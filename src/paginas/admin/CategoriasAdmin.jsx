import { useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import Aviso from '../../componentes/atomos/Aviso'
import Boton from '../../componentes/atomos/Boton'
import Titulo from '../../componentes/atomos/Titulo'
import { eliminarCategoria, listarCategorias } from '../../data/categorias'
import { listarProductos } from '../../data/productos'

function CategoriasAdmin() {
  const [categorias, setCategorias] = useState(() => listarCategorias())
  const [aviso, setAviso] = useState(null)

  const productos = listarProductos()

  function borrar(categoria) {
    const usadas = productos.filter((producto) => producto.categoria === categoria.slug).length

    if (usadas > 0) {
      setAviso({
        tono: 'error',
        texto: `No se puede eliminar "${categoria.nombre}": tiene ${usadas} producto(s) asociados.`,
      })
      return
    }

    eliminarCategoria(categoria.id)
    setCategorias(listarCategorias())
    setAviso({ tono: 'exito', texto: `Se eliminó la categoría "${categoria.nombre}".` })
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
        <Titulo nivel={1} bajada="Agrupan los productos dentro de la tienda.">
          Categorías
        </Titulo>
        <Boton as={Link} to="/admin/categorias/nueva">
          Nueva categoría
        </Boton>
      </div>

      {aviso !== null && (
        <Aviso tono={aviso.tono} onCerrar={() => setAviso(null)}>
          {aviso.texto}
        </Aviso>
      )}

      <Table responsive bordered className="align-middle bg-white">
        <caption className="visually-hidden">Listado de categorías</caption>
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Identificador</th>
            <th scope="col">Productos</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>
                <Link to={`/categorias/${categoria.slug}`}>{categoria.nombre}</Link>
              </td>
              <td>{categoria.slug}</td>
              <td>{productos.filter((producto) => producto.categoria === categoria.slug).length}</td>
              <td className="d-flex gap-2">
                <Boton
                  variante="secundario"
                  tamano="sm"
                  as={Link}
                  to={`/admin/categorias/${categoria.id}`}
                >
                  Editar
                </Boton>
                <Boton variante="peligro" tamano="sm" onClick={() => borrar(categoria)}>
                  Eliminar
                </Boton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default CategoriasAdmin
