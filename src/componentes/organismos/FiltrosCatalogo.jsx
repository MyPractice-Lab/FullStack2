import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

function FiltrosCatalogo({ criterios, categorias, onCambiar, resultados }) {
  function cambiar(campo, valor) {
    onCambiar({ ...criterios, [campo]: valor })
  }

  return (
    <section className="zone-panel mb-4" aria-label="Filtros del catálogo">
      <Row className="g-3">
        <Col md={4}>
          <Form.Label htmlFor="filtro-texto">Buscar por nombre</Form.Label>
          <Form.Control
            id="filtro-texto"
            type="search"
            value={criterios.texto}
            onChange={(evento) => cambiar('texto', evento.target.value)}
            placeholder="Teclado, mouse, notebook..."
          />
        </Col>
        <Col md={4}>
          <Form.Label htmlFor="filtro-categoria">Categoría</Form.Label>
          <Form.Select
            id="filtro-categoria"
            value={criterios.categoria}
            onChange={(evento) => cambiar('categoria', evento.target.value)}
          >
            <option value="todas">Todas las categorías</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.slug}>
                {categoria.nombre}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Label htmlFor="filtro-orden">Ordenar por</Form.Label>
          <Form.Select
            id="filtro-orden"
            value={criterios.orden}
            onChange={(evento) => cambiar('orden', evento.target.value)}
          >
            <option value="relevancia">Relevancia</option>
            <option value="menor">Precio: de menor a mayor</option>
            <option value="mayor">Precio: de mayor a menor</option>
            <option value="nombre">Nombre</option>
          </Form.Select>
        </Col>
      </Row>

      <p className="small text-muted mt-3 mb-0" role="status">
        {resultados} {resultados === 1 ? 'producto encontrado' : 'productos encontrados'}
      </p>
    </section>
  )
}

export default FiltrosCatalogo
