import Form from 'react-bootstrap/Form'

function CampoFormulario({
  id,
  etiqueta,
  tipo = 'text',
  valor,
  onCambiar,
  error = null,
  ayuda = null,
  requerido = false,
  marcador = '',
  opciones = [],
  filas = 4,
  autocompletar,
  sugerencia = null,
  onAceptarSugerencia = null,
  deshabilitado = false,
}) {
  const invalido = error !== null && error !== undefined

  if (tipo === 'checkbox') {
    return (
      <Form.Group className="mb-3" controlId={id}>
        <Form.Check
          type="checkbox"
          label={etiqueta}
          checked={valor}
          onChange={(evento) => onCambiar(evento.target.checked)}
          isInvalid={invalido}
          feedback={error ?? undefined}
          feedbackType="invalid"
          disabled={deshabilitado}
        />
      </Form.Group>
    )
  }

  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>
        {etiqueta}
        {requerido && <span aria-hidden="true"> *</span>}
      </Form.Label>

      {tipo === 'select' ? (
        <Form.Select
          value={valor}
          onChange={(evento) => onCambiar(evento.target.value)}
          isInvalid={invalido}
          disabled={deshabilitado}
          required={requerido}
        >
          <option value="">{marcador || 'Selecciona una opción'}</option>
          {opciones.map((opcion) => (
            <option key={opcion.valor} value={opcion.valor}>
              {opcion.texto}
            </option>
          ))}
        </Form.Select>
      ) : (
        <Form.Control
          as={tipo === 'textarea' ? 'textarea' : 'input'}
          type={tipo === 'textarea' ? undefined : tipo}
          rows={tipo === 'textarea' ? filas : undefined}
          value={valor}
          onChange={(evento) => onCambiar(evento.target.value)}
          isInvalid={invalido}
          placeholder={marcador}
          autoComplete={autocompletar}
          disabled={deshabilitado}
          required={requerido}
        />
      )}

      {ayuda !== null && <Form.Text className="text-muted">{ayuda}</Form.Text>}

      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>

      {sugerencia !== null && (
        <div className="mt-1">
          <small>
            Quizás quisiste escribir{' '}
            <button
              type="button"
              className="btn btn-link btn-sm p-0 align-baseline"
              onClick={() => onAceptarSugerencia(sugerencia)}
            >
              {sugerencia}
            </button>
          </small>
        </div>
      )}
    </Form.Group>
  )
}

export default CampoFormulario
