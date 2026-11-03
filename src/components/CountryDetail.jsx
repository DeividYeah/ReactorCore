function CountryDetail({ pais, onCerrar }) {
  // Valor derivado de las props, sin estado propio
  const densidad = pais.superficie > 0 ? Math.round(pais.poblacion / pais.superficie) : 0

  return (
    <section className="tarjeta">
      <h2>{pais.nombre}</h2>
      <p>Capital: {pais.capital}</p>
      <p>Región: {pais.region}</p>
      <p>Población: {pais.poblacion.toLocaleString('es-ES')}</p>
      <p>Superficie: {pais.superficie.toLocaleString('es-ES')} km²</p>
      <p>Densidad: {densidad} hab/km²</p>
      <p>Idiomas: {pais.idiomas}</p>
      <button onClick={onCerrar}>Cerrar</button>
    </section>
  )
}

export default CountryDetail
