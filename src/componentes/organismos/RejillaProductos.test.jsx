import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { ConRutas } from '../../test/apoyo'
import RejillaProductos from './RejillaProductos'

const PRODUCTOS = [
  {
    id: 1,
    nombre: 'Teclado mecánico Zone K80 RGB',
    categoria: 'teclados',
    precio: 59990,
    oferta: 47990,
    stock: 12,
    imagen: '/assets/img/teclado.jpg',
  },
  {
    id: 2,
    nombre: 'Mouse gamer Zone M5 Pro',
    categoria: 'mouse',
    precio: 29990,
    oferta: null,
    stock: 20,
    imagen: '/assets/img/mouse.jpg',
  },
  {
    id: 3,
    nombre: 'Audífonos Zone H3 Surround',
    categoria: 'accesorios',
    precio: 49990,
    oferta: null,
    stock: 0,
    imagen: '/assets/img/portada.jpg',
  },
]

function montar(productos) {
  return render(
    <ConRutas>
      <RejillaProductos productos={productos} onAgregar={vi.fn()} />
    </ConRutas>,
  )
}

describe('RejillaProductos', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('renderiza una tarjeta por cada producto del conjunto de datos', () => {
    montar(PRODUCTOS)

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(PRODUCTOS.length)

    for (const producto of PRODUCTOS) {
      expect(screen.getByText(producto.nombre)).toBeInTheDocument()
    }
  })

  test('muestra el precio rebajado y el anterior solo cuando el producto esta en oferta', () => {
    montar(PRODUCTOS)

    expect(screen.getByText('$47.990')).toBeInTheDocument()
    expect(screen.getByText('$59.990')).toBeInTheDocument()
    expect(screen.getByText('-20%')).toBeInTheDocument()

    expect(screen.getByText('$29.990')).toBeInTheDocument()
    expect(screen.queryByText('-0%')).not.toBeInTheDocument()
  })

  test('marca como agotado y deshabilita el boton del producto sin stock', () => {
    montar(PRODUCTOS)

    expect(screen.getByText('Sin stock')).toBeInTheDocument()
    expect(screen.getByText('Agotado por ahora')).toBeInTheDocument()

    const botones = screen.getAllByRole('button', { name: 'Agregar' })
    expect(botones.filter((boton) => boton.disabled)).toHaveLength(1)
  })

  test('muestra el mensaje de vacio cuando no hay productos', () => {
    montar([])

    expect(screen.getByText('No hay productos que mostrar.')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument()
  })
})
