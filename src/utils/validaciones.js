const CORRECCIONES_DOMINIO = {
  'gmail.co': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'hotmial.com': 'hotmail.com',
  'hotmai.com': 'hotmail.com',
  'hotmail.co': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'yaho.com': 'yahoo.com',
  'duc.cl': 'duocuc.cl',
  'duocuc.com': 'duocuc.cl',
}

const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

export function validarRequerido(valor, mensaje) {
  return String(valor ?? '').trim() === '' ? mensaje : null
}

export function validarNombre(valor) {
  const nombre = String(valor ?? '').trim()

  if (nombre === '') {
    return 'El nombre completo es obligatorio.'
  }

  if (!nombre.includes(' ')) {
    return 'Escribe nombre y apellido separados por un espacio.'
  }

  return null
}

export function validarCorreo(valor) {
  const correo = String(valor ?? '').trim()

  if (correo === '') {
    return 'El correo es obligatorio.'
  }

  if (!PATRON_CORREO.test(correo)) {
    return 'El correo no tiene un formato válido. Debe ser parecido a nombre@dominio.cl'
  }

  return null
}

export function sugerenciaCorreo(valor) {
  const partes = String(valor ?? '').trim().split('@')

  if (partes.length !== 2) {
    return null
  }

  const correccion = CORRECCIONES_DOMINIO[partes[1].toLowerCase()]
  return correccion ? `${partes[0]}@${correccion}` : null
}

export function validarClave(valor) {
  const clave = String(valor ?? '')

  if (clave === '') {
    return 'La contraseña es obligatoria.'
  }

  if (clave.length < 8) {
    return `La contraseña debe tener al menos 8 caracteres. Escribiste ${clave.length}.`
  }

  if (!/[0-9]/.test(clave)) {
    return 'La contraseña debe incluir al menos un número.'
  }

  if (!/[A-Z]/.test(clave)) {
    return 'La contraseña debe incluir al menos una letra mayúscula.'
  }

  return null
}

export function validarRepetirClave(clave, repetir) {
  if (String(repetir ?? '') === '') {
    return 'Repite la contraseña para confirmarla.'
  }

  if (clave !== repetir) {
    return 'Las contraseñas no coinciden.'
  }

  return null
}

export function validarConsulta(valor) {
  const mensaje = String(valor ?? '').trim()

  if (mensaje === '') {
    return 'Escribe tu consulta antes de enviar.'
  }

  if (mensaje.length < 10) {
    return `Cuéntanos un poco más: faltan ${10 - mensaje.length} caracteres.`
  }

  return null
}

export function validarPrecio(valor) {
  const precio = Number(valor)

  if (String(valor ?? '').trim() === '') {
    return 'El precio es obligatorio.'
  }

  if (Number.isNaN(precio) || precio <= 0) {
    return 'El precio debe ser un número mayor que cero.'
  }

  return null
}

export function validarStock(valor) {
  const stock = Number(valor)

  if (String(valor ?? '').trim() === '') {
    return 'El stock es obligatorio.'
  }

  if (!Number.isInteger(stock) || stock < 0) {
    return 'El stock debe ser un número entero igual o mayor que cero.'
  }

  return null
}

export function hayErrores(errores) {
  return Object.values(errores).some((error) => error !== null && error !== undefined)
}
