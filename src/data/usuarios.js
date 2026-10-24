import { guardar, leerConSemilla, siguienteId } from './almacenamiento'
import { CLAVES } from './claves'
import { usuariosSemilla } from './semillas'

function leerUsuarios() {
  return leerConSemilla(CLAVES.usuarios, usuariosSemilla)
}

function guardarUsuarios(lista) {
  return guardar(CLAVES.usuarios, lista)
}

export function listarUsuarios() {
  return leerUsuarios()
}

export function obtenerUsuario(id) {
  const buscado = Number(id)
  return leerUsuarios().find((usuario) => usuario.id === buscado) ?? null
}

export function obtenerUsuarioPorCorreo(correo) {
  const buscado = correo.trim().toLowerCase()
  return leerUsuarios().find((usuario) => usuario.correo.toLowerCase() === buscado) ?? null
}

export function crearUsuario(datos) {
  const lista = leerUsuarios()
  const nuevo = {
    id: siguienteId(lista),
    nombre: datos.nombre,
    correo: datos.correo.trim().toLowerCase(),
    clave: datos.clave,
    rol: datos.rol || 'cliente',
    region: datos.region || '',
    comuna: datos.comuna || '',
    calle: datos.calle || '',
    activo: true,
  }

  guardarUsuarios([...lista, nuevo])
  return nuevo
}

export function actualizarUsuario(id, datos) {
  const buscado = Number(id)
  let actualizado = null

  const lista = leerUsuarios().map((usuario) => {
    if (usuario.id !== buscado) {
      return usuario
    }

    actualizado = { ...usuario, ...datos, id: buscado }
    return actualizado
  })

  guardarUsuarios(lista)
  return actualizado
}

export function eliminarUsuario(id) {
  const buscado = Number(id)
  const lista = leerUsuarios().filter((usuario) => usuario.id !== buscado)
  guardarUsuarios(lista)
  return lista
}

export function autenticar(correo, clave) {
  const usuario = obtenerUsuarioPorCorreo(correo)

  if (usuario === null) {
    return { ok: false, motivo: 'No existe una cuenta con ese correo.' }
  }

  if (usuario.activo === false) {
    return { ok: false, motivo: 'La cuenta está desactivada. Escríbenos para reactivarla.' }
  }

  if (usuario.clave !== clave) {
    return { ok: false, motivo: 'La contraseña no coincide con la cuenta.' }
  }

  return { ok: true, usuario }
}
