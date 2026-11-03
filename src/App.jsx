import { useFetch } from './hooks/useFetch.js'
import CountryList from './components/CountryList.jsx'

const URL_API =
  'https://restcountries.com/v3.1/all?fields=name,translations,cca3,capital,region,population,area,flags,languages'

function App() {
  const { datos, cargando, error } = useFetch(URL_API)

  if (cargando) return <p>Cargando países...</p>
  if (error) return <p className="error">No se pudieron cargar los países: {error}</p>

  // Añadimos el nombre en español una sola vez
  const paises = datos.map((p) => ({
    ...p,
    nombre: p.translations?.spa?.common ?? p.name.common,
  }))

  return (
    <main>
      <h1>Explorador de países</h1>
      <CountryList paises={paises} />
    </main>
  )
}

export default App
