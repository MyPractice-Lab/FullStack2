import { beforeEach, expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import App from '../App'
import { CLAVES } from '../data/claves'
import { ConTienda } from './apoyo'

function montar(ruta) {
  return render(
    <ConTienda ruta={ruta}>
      <App />
    </ConTienda>,
  )
}

function botonEnviar(pantalla) {
  return pantalla.getByRole('main').getByRole('button', { name: 'Crear cuenta' })
}

beforeEach(() => {
  localStorage.clear()
})

test('el formulario de registro muestra los errores propios de cada campo', async () => {
  const pantalla = await montar('/registro')

  await botonEnviar(pantalla).click()

  await expect.element(pantalla.getByText('El nombre completo es obligatorio.')).toBeVisible()
  await expect.element(pantalla.getByText('El correo es obligatorio.')).toBeVisible()
  await expect.element(pantalla.getByText('La contraseña es obligatoria.')).toBeVisible()
  await expect
    .element(pantalla.getByText('Debes aceptar los términos y condiciones para crear la cuenta.'))
    .toBeVisible()

  await pantalla.getByRole('textbox', { name: 'Nombre completo' }).fill('Ana')
  await pantalla.getByLabelText(/^Contraseña/).fill('corta1')
  await botonEnviar(pantalla).click()

  await expect
    .element(pantalla.getByText('Escribe nombre y apellido separados por un espacio.'))
    .toBeVisible()
  await expect
    .element(pantalla.getByText('La contraseña debe tener al menos 8 caracteres. Escribiste 6.'))
    .toBeVisible()

  expect(localStorage.getItem(CLAVES.usuarios)).toBeNull()
})

test('el registro valido crea la cuenta y la guarda en el navegador', async () => {
  const pantalla = await montar('/registro')

  await pantalla.getByRole('textbox', { name: 'Nombre completo' }).fill('Ana Rojas')
  await pantalla.getByRole('textbox', { name: 'Correo electrónico' }).fill('ana.rojas@gmail.com')
  await pantalla.getByLabelText(/^Contraseña/).fill('Clave2026')
  await pantalla.getByLabelText(/^Repetir contraseña/).fill('Clave2026')
  await pantalla.getByRole('combobox', { name: 'Región' }).selectOptions('Valparaíso')
  await pantalla.getByRole('combobox', { name: 'Comuna' }).selectOptions('Viña del Mar')
  await pantalla
    .getByRole('checkbox', { name: 'Acepto los términos y condiciones de la tienda' })
    .click()

  await botonEnviar(pantalla).click()

  await expect
    .element(pantalla.getByText('Cuenta creada correctamente. Ya puedes iniciar sesión.'))
    .toBeVisible()

  const usuarios = JSON.parse(localStorage.getItem(CLAVES.usuarios))
  const creada = usuarios.find((usuario) => usuario.correo === 'ana.rojas@gmail.com')

  expect(creada).toBeDefined()
  expect(creada.rol).toBe('cliente')
  expect(creada.comuna).toBe('Viña del Mar')
})
