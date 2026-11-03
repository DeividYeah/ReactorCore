import CountryCard from './CountryCard.jsx'

function CountryList({ paises, favoritos, onToggleFavorito, onVerDetalle }) {
  if (paises.length === 0) {
    return <p>No hay países que coincidan.</p>
  }

  return (
    <ul className="lista">
      {paises.map((pais) => (
        // cca3 es el código del país (ESP, FRA...): único y estable
        <CountryCard
          key={pais.cca3}
          pais={pais}
          esFavorito={favoritos.includes(pais.cca3)}
          onToggleFavorito={onToggleFavorito}
          onVerDetalle={onVerDetalle}
        />
      ))}
    </ul>
  )
}

export default CountryList
