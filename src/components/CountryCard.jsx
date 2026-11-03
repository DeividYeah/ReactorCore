function CountryCard({ pais, esFavorito, onToggleFavorito, onVerDetalle }) {
  return (
    <li className="tarjeta">
      <h3>{pais.nombre}</h3>
      <p>Población: {pais.poblacion.toLocaleString('es-ES')}</p>
      <button onClick={() => onVerDetalle(pais.codigo)}>Ver detalle</button>
      <button onClick={() => onToggleFavorito(pais.codigo)}>
        {esFavorito ? '★ Quitar' : '☆ Favorito'}
      </button>
    </li>
  )
}

export default CountryCard
