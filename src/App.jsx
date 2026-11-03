import { useState, useEffect } from 'react'
import { useFetch } from './hooks/useFetch.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import SearchBar from './components/SearchBar.jsx'
import RegionFilter from './components/RegionFilter.jsx'
import CountryList from './components/CountryList.jsx'
import CountryDetail from './components/CountryDetail.jsx'
import PopulationChallenge from './components/PopulationChallenge.jsx'

// Datos locales en public/ (la API de REST Countries no responde)
const URL_API = '/paises.json'

function App() {
  const { datos, cargando, error } = useFetch(URL_API)
  const [busqueda, setBusqueda] = useState('')
  const [region, setRegion] = useState('Todas')
  const [modo, setModo] = useState('explorar') // 'explorar' | 'reto'
  const [soloFavoritos, setSoloFavoritos] = useState(false)
  // Solo guardamos los códigos (cca3), no los países enteros
  const [favoritos, setFavoritos] = useLocalStorage('favoritos', [])
  // Guardamos solo el código del país seleccionado, el objeto se deriva
  const [codigoSeleccionado, setCodigoSeleccionado] = useState(null)

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

  const paisSeleccionado = paises.find((p) => p.cca3 === codigoSeleccionado)

  return (
    <main>
      <h1>Explorador de países</h1>
      <nav>
        <button onClick={() => setModo('explorar')} disabled={modo === 'explorar'}>
          Explorar
        </button>
        <button onClick={() => setModo('reto')} disabled={modo === 'reto'}>
          Reto de población
        </button>
      </nav>

      {modo === 'reto' ? (
        <PopulationChallenge paises={paises} />
      ) : (
        <>
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
          {paisSeleccionado && (
            <CountryDetail pais={paisSeleccionado} onCerrar={() => setCodigoSeleccionado(null)} />
          )}
          <p>
            Mostrando {paisesFiltrados.length} de {paises.length} países
          </p>
          <CountryList
            paises={paisesFiltrados}
            favoritos={favoritos}
            onToggleFavorito={toggleFavorito}
            onVerDetalle={setCodigoSeleccionado}
          />
        </>
      )}
    </main>
  )
}

export default App
