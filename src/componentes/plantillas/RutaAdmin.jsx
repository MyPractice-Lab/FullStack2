import { Navigate, Outlet } from 'react-router-dom'
import { useSesion } from '../../hooks/useSesion'

function RutaAdmin() {
  const { autenticado, esAdministrador } = useSesion()

  if (autenticado === false) {
    return <Navigate to="/login" replace />
  }

  if (esAdministrador === false) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default RutaAdmin
