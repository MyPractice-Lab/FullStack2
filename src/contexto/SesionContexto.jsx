import { createContext, useCallback, useMemo, useState } from 'react'
import { borrarSesion, guardarSesion, leerSesion } from '../data/sesion'
import { autenticar } from '../data/usuarios'

export const SesionContexto = createContext(null)

export function ProveedorSesion({ children }) {
  const [usuario, setUsuario] = useState(() => leerSesion())

  const iniciarSesion = useCallback((correo, clave) => {
    const resultado = autenticar(correo, clave)

    if (resultado.ok) {
      guardarSesion(resultado.usuario)
      setUsuario(leerSesion())
    }

    return resultado
  }, [])

  const cerrarSesion = useCallback(() => {
    borrarSesion()
    setUsuario(null)
  }, [])

  const refrescarSesion = useCallback((datos) => {
    guardarSesion(datos)
    setUsuario(leerSesion())
  }, [])

  const valor = useMemo(
    () => ({
      usuario,
      autenticado: usuario !== null,
      esAdministrador: usuario?.rol === 'administrador',
      iniciarSesion,
      cerrarSesion,
      refrescarSesion,
    }),
    [usuario, iniciarSesion, cerrarSesion, refrescarSesion],
  )

  return <SesionContexto.Provider value={valor}>{children}</SesionContexto.Provider>
}
