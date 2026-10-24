import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import Boton from './Boton'

describe('Boton', () => {
  test('muestra la etiqueta que recibe por props', () => {
    render(<Boton>Agregar al carrito</Boton>)

    expect(screen.getByRole('button', { name: 'Agregar al carrito' })).toBeInTheDocument()
  })

  test('ejecuta la funcion onClick que recibe por props', async () => {
    const alHacerClic = vi.fn()
    render(<Boton onClick={alHacerClic}>Agregar</Boton>)

    await userEvent.click(screen.getByRole('button', { name: 'Agregar' }))

    expect(alHacerClic).toHaveBeenCalledTimes(1)
  })

  test('no ejecuta onClick cuando la prop deshabilitado es verdadera', async () => {
    const alHacerClic = vi.fn()
    render(
      <Boton onClick={alHacerClic} deshabilitado>
        Sin stock
      </Boton>,
    )

    const boton = screen.getByRole('button', { name: 'Sin stock' })

    expect(boton).toBeDisabled()
    await userEvent.click(boton)
    expect(alHacerClic).not.toHaveBeenCalled()
  })

  test('aplica la variante de peligro cuando se le pide', () => {
    render(<Boton variante="peligro">Quitar</Boton>)

    expect(screen.getByRole('button', { name: 'Quitar' })).toHaveClass('btn-danger')
  })
})
