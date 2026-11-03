function CountryCard({ pais }) {
  return (
    <li className="tarjeta">
      <img src={pais.flags.png} alt={pais.flags.alt || `Bandera de ${pais.nombre}`} />
      <h3>{pais.nombre}</h3>
      <p>Población: {pais.population.toLocaleString('es-ES')}</p>
    </li>
  )
}

export default CountryCard
