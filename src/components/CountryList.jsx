import CountryCard from './CountryCard.jsx'

function CountryList({ paises, favoritos, onToggleFavorito, onVerDetalle }) {
  if (paises.length === 0) {
    return <p>No hay países que coincidan.</p>
  }

  return (
    <ul className="lista">
      {paises.map((pais) => (
        // codigo es el código ISO del país (ESP, FRA...): único y estable
        <CountryCard
          key={pais.codigo}
          pais={pais}
          esFavorito={favoritos.includes(pais.codigo)}
          onToggleFavorito={onToggleFavorito}
          onVerDetalle={onVerDetalle}
        />
      ))}
    </ul>
  )
}

export default CountryList
