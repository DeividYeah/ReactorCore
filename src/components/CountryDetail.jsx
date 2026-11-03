function CountryDetail({ pais, onCerrar }) {
  // Derivados a partir de las props, sin estado propio
  const idiomas = pais.languages ? Object.values(pais.languages).join(', ') : 'Sin datos'
  const densidad = pais.area > 0 ? Math.round(pais.population / pais.area) : 0

  return (
    <section className="tarjeta">
      <h2>{pais.nombre}</h2>
      <img src={pais.flags.png} alt={pais.flags.alt || `Bandera de ${pais.nombre}`} width="160" />
      <p>Capital: {pais.capital?.[0] ?? 'Sin capital'}</p>
      <p>Región: {pais.region}</p>
      <p>Población: {pais.population.toLocaleString('es-ES')}</p>
      <p>Superficie: {pais.area.toLocaleString('es-ES')} km²</p>
      <p>Densidad: {densidad} hab/km²</p>
      <p>Idiomas: {idiomas}</p>
      <button onClick={onCerrar}>Cerrar</button>
    </section>
  )
}

export default CountryDetail
