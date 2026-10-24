import Table from 'react-bootstrap/Table'

function FichaTecnica({ filas, titulo = 'Ficha técnica del producto' }) {
  return (
    <Table bordered size="sm" className="mb-3">
      <caption className="visually-hidden">{titulo}</caption>
      <tbody>
        {filas.map((fila) => (
          <tr key={fila.campo}>
            <th scope="row">{fila.campo}</th>
            <td>{fila.valor}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default FichaTecnica
