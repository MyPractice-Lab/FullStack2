import { Route, Routes } from 'react-router-dom'
import PlantillaAdmin from './componentes/plantillas/PlantillaAdmin'
import PlantillaTienda from './componentes/plantillas/PlantillaTienda'
import RutaAdmin from './componentes/plantillas/RutaAdmin'
import Boleta from './paginas/admin/Boleta'
import CategoriaFormulario from './paginas/admin/CategoriaFormulario'
import CategoriasAdmin from './paginas/admin/CategoriasAdmin'
import Dashboard from './paginas/admin/Dashboard'
import HistorialCompras from './paginas/admin/HistorialCompras'
import OrdenesAdmin from './paginas/admin/OrdenesAdmin'
import Perfil from './paginas/admin/Perfil'
import ProductoFormulario from './paginas/admin/ProductoFormulario'
import ProductosAdmin from './paginas/admin/ProductosAdmin'
import ProductosCriticos from './paginas/admin/ProductosCriticos'
import Reportes from './paginas/admin/Reportes'
import UsuarioFormulario from './paginas/admin/UsuarioFormulario'
import UsuariosAdmin from './paginas/admin/UsuariosAdmin'
import Blog from './paginas/tienda/Blog'
import Carrito from './paginas/tienda/Carrito'
import Categoria from './paginas/tienda/Categoria'
import Categorias from './paginas/tienda/Categorias'
import Checkout from './paginas/tienda/Checkout'
import Contacto from './paginas/tienda/Contacto'
import DetalleBlog from './paginas/tienda/DetalleBlog'
import DetalleProducto from './paginas/tienda/DetalleProducto'
import Home from './paginas/tienda/Home'
import Login from './paginas/tienda/Login'
import NoEncontrada from './paginas/tienda/NoEncontrada'
import Nosotros from './paginas/tienda/Nosotros'
import Ofertas from './paginas/tienda/Ofertas'
import PagoExitoso from './paginas/tienda/PagoExitoso'
import PagoRechazado from './paginas/tienda/PagoRechazado'
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
        <Route path="carrito" element={<Carrito />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="pago/exitoso/:codigo" element={<PagoExitoso />} />
        <Route path="pago/rechazado/:codigo" element={<PagoRechazado />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>

      <Route path="admin" element={<RutaAdmin />}>
        <Route element={<PlantillaAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="ordenes" element={<OrdenesAdmin />} />
          <Route path="ordenes/:codigo" element={<Boleta />} />
          <Route path="productos" element={<ProductosAdmin />} />
          <Route path="productos/nuevo" element={<ProductoFormulario />} />
          <Route path="productos/criticos" element={<ProductosCriticos />} />
          <Route path="productos/:id" element={<ProductoFormulario />} />
          <Route path="categorias" element={<CategoriasAdmin />} />
          <Route path="categorias/nueva" element={<CategoriaFormulario />} />
          <Route path="categorias/:id" element={<CategoriaFormulario />} />
          <Route path="usuarios" element={<UsuariosAdmin />} />
          <Route path="usuarios/nuevo" element={<UsuarioFormulario />} />
          <Route path="usuarios/:id" element={<UsuarioFormulario />} />
          <Route path="usuarios/:id/compras" element={<HistorialCompras />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
