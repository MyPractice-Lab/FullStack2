import { Route, Routes } from 'react-router-dom'
import PlantillaTienda from './componentes/plantillas/PlantillaTienda'
import Blog from './paginas/tienda/Blog'
import Categoria from './paginas/tienda/Categoria'
import Categorias from './paginas/tienda/Categorias'
import Contacto from './paginas/tienda/Contacto'
import DetalleBlog from './paginas/tienda/DetalleBlog'
import DetalleProducto from './paginas/tienda/DetalleProducto'
import Home from './paginas/tienda/Home'
import Login from './paginas/tienda/Login'
import NoEncontrada from './paginas/tienda/NoEncontrada'
import Nosotros from './paginas/tienda/Nosotros'
import Ofertas from './paginas/tienda/Ofertas'
import Productos from './paginas/tienda/Productos'
import Registro from './paginas/tienda/Registro'

function App() {
  return (
    <Routes>
      <Route element={<PlantillaTienda />}>
        <Route index element={<Home />} />
        <Route path="productos" element={<Productos />} />
        <Route path="producto/:id" element={<DetalleProducto />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="categorias/:slug" element={<Categoria />} />
        <Route path="ofertas" element={<Ofertas />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<DetalleBlog />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}

export default App
