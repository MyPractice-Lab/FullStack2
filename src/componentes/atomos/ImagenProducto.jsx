function ImagenProducto({ origen, descripcion, miniatura = false }) {
  return (
    <img
      src={origen}
      alt={descripcion}
      className={miniatura ? 'zone-imagen-miniatura' : 'zone-imagen-producto w-100'}
      loading="lazy"
    />
  )
}

export default ImagenProducto
