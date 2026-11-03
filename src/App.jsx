import { useState, useEffect } from 'react'
import { useFetch } from './hooks/useFetch.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import SearchBar from './components/SearchBar.jsx'
import RegionFilter from './components/RegionFilter.jsx'
import CountryList from './components/CountryList.jsx'

const URL_API =
  'https://restcountries.com/v3.1/all?fields=name,translations,cca3,capital,region,population,area,flags,languages'

function App() {
  const { datos, cargando, error } = useFetch(URL_API)
  const [busqueda, setBusqueda] = useState('')
  const [region, setRegion] = useState('Todas')
  const [soloFavoritos, setSoloFavoritos] = useState(false)
  // Solo guardamos los códigos (cca3), no los países enteros
  const [favoritos, setFavoritos] = useLocalStorage('favoritos', [])

  // El título de la pestaña muestra cuántos favoritos hay
  useEffect(() => {
    document.title = `Países (${favoritos.length} ★)`
  }, [favoritos.length])

  function toggleFavorito(codigo) {
    setFavoritos((prev) =>
      prev.includes(codigo) ? prev.filter((c) => c !== codigo) : [...prev, codigo]
    )
  }

  if (cargando) return <p>Cargando países...</p>
  if (error) return <p className="error">No se pudieron cargar los países: {error}</p>

  // Valores derivados: se calculan en cada render, no se guardan en estado
  const paises = datos
    .map((p) => ({ ...p, nombre: p.translations?.spa?.common ?? p.name.common }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre))

  const paisesFiltrados = paises.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (region === 'Todas' || p.region === region) &&
      (!soloFavoritos || favoritos.includes(p.cca3))
  )

  return (
    <main>
      <h1>Explorador de países</h1>
      <SearchBar valor={busqueda} onCambiar={setBusqueda} />
      <RegionFilter valor={region} onCambiar={setRegion} />
      <label>
        <input
          type="checkbox"
          checked={soloFavoritos}
          onChange={(e) => setSoloFavoritos(e.target.checked)}
        />
        Solo favoritos ({favoritos.length})
      </label>
      <p>Mostrando {paisesFiltrados.length} de {paises.length} países</p>
      <CountryList
        paises={paisesFiltrados}
        favoritos={favoritos}
        onToggleFavorito={toggleFavorito}
      />
    </main>
  )
}

export default App
