const REGIONES = ['Todas', 'África', 'América', 'Asia', 'Europa', 'Oceanía', 'Antártida']

function RegionFilter({ valor, onCambiar }) {
  return (
    <select value={valor} onChange={(e) => onCambiar(e.target.value)}>
      {REGIONES.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  )
}

export default RegionFilter
