import { useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import Aviso from '../../componentes/atomos/Aviso'
import Boton from '../../componentes/atomos/Boton'
import Etiqueta from '../../componentes/atomos/Etiqueta'
import ImagenProducto from '../../componentes/atomos/ImagenProducto'
import Titulo from '../../componentes/atomos/Titulo'
import { listarCategorias } from '../../data/categorias'
import { eliminarProducto, listarProductos } from '../../data/productos'
import { STOCK_CRITICO, precioFinal, tieneOferta } from '../../utils/catalogo'
import { formatearPrecio } from '../../utils/formato'

function ProductosAdmin() {
  const [productos, setProductos] = useState(() => listarProductos())
  const [aviso, setAviso] = useState('')

  const nombres = new Map(listarCategorias().map((categoria) => [categoria.slug, categoria.nombre]))

  function borrar(producto) {
    if (!window.confirm(`¿Eliminar "${producto.nombre}" del catálogo?`)) {
      return
    }

    eliminarProducto(producto.id)
    setProductos(listarProductos())
    setAviso(`Se eliminó "${producto.nombre}" del catálogo.`)
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
        <Titulo nivel={1} bajada="Inventario completo de la tienda.">
          Productos
        </Titulo>
        <Boton as={Link} to="/admin/productos/nuevo">
          Nuevo producto
        </Boton>
      </div>

      {aviso !== '' && (
        <Aviso tono="exito" onCerrar={() => setAviso('')}>
          {aviso}
        </Aviso>
      )}

      {productos.length === 0 ? (
        <p className="text-muted">No hay productos en el catálogo.</p>
      ) : (
        <Table responsive bordered className="align-middle bg-white">
          <caption className="visually-hidden">Listado de productos del catálogo</caption>
          <thead>
            <tr>
              <th scope="col">Imagen</th>
              <th scope="col">Nombre</th>
              <th scope="col">Categoría</th>
              <th scope="col">Precio</th>
              <th scope="col">Stock</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>
                  <ImagenProducto origen={producto.imagen} descripcion={producto.nombre} miniatura />
                </td>
                <td>
                  <Link to={`/producto/${producto.id}`}>{producto.nombre}</Link>
                  {tieneOferta(producto) && (
                    <>
                      {' '}
                      <Etiqueta tono="oferta">Oferta</Etiqueta>
                    </>
                  )}
                </td>
                <td>{nombres.get(producto.categoria) ?? producto.categoria}</td>
                <td>{formatearPrecio(precioFinal(producto))}</td>
                <td className={producto.stock <= STOCK_CRITICO ? 'zone-stock-critico' : undefined}>
                  {producto.stock}
                </td>
                <td className="d-flex gap-2">
                  <Boton
                    variante="secundario"
                    tamano="sm"
                    as={Link}
                    to={`/admin/productos/${producto.id}`}
                  >
                    Editar
                  </Boton>
                  <Boton variante="peligro" tamano="sm" onClick={() => borrar(producto)}>
                    Eliminar
                  </Boton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductosAdmin
