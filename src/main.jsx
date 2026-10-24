import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import { ProveedorCarrito } from './contexto/CarritoContexto.jsx'
import { ProveedorSesion } from './contexto/SesionContexto.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/FullStack2">
      <ProveedorSesion>
        <ProveedorCarrito>
          <App />
        </ProveedorCarrito>
      </ProveedorSesion>
    </BrowserRouter>
  </StrictMode>,
)
