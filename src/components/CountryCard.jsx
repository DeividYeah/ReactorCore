function CountryCard({ pais, esFavorito, onToggleFavorito, onVerDetalle }) {
  return (
    <li className="tarjeta">
      <img src={pais.flags.png} alt={pais.flags.alt || `Bandera de ${pais.nombre}`} />
      <h3>{pais.nombre}</h3>
      <p>Población: {pais.population.toLocaleString('es-ES')}</p>
      <button onClick={() => onVerDetalle(pais.cca3)}>Ver detalle</button>
      <button onClick={() => onToggleFavorito(pais.cca3)}>
        {esFavorito ? '★ Quitar' : '☆ Favorito'}
      </button>
    </li>
  )
}

export default CountryCard
