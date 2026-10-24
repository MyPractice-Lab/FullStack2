function Titulo({ children, nivel = 2, bajada = null }) {
  const Etiqueta = `h${nivel}`

  return (
    <>
      <Etiqueta className="zone-titulo">{children}</Etiqueta>
      {bajada !== null && <p className="zone-bajada">{bajada}</p>}
    </>
  )
}

export default Titulo
