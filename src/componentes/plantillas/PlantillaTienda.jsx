import Container from 'react-bootstrap/Container'
import { Outlet } from 'react-router-dom'
import { useCarrito } from '../../hooks/useCarrito'
import Aviso from '../atomos/Aviso'
import Encabezado from '../organismos/Encabezado'
import PieDePagina from '../organismos/PieDePagina'

function PlantillaTienda() {
  const { aviso } = useCarrito()

  return (
    <>
      <Encabezado />

      <main className="py-4 flex-grow-1">
        <Container>
          {aviso !== '' && <Aviso tono="exito">{aviso}</Aviso>}
          <Outlet />
        </Container>
      </main>

      <PieDePagina />
    </>
  )
}

export default PlantillaTienda
