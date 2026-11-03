function SearchBar({ valor, onCambiar }) {
  return (
    <input
      type="search"
      placeholder="Buscar país..."
      value={valor}
      onChange={(e) => onCambiar(e.target.value)}
    />
  )
}

export default SearchBar
