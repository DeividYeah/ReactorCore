import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

function parejaAleatoria(paises) {
  const a = Math.floor(Math.random() * paises.length)
  let b = Math.floor(Math.random() * paises.length)
  while (b === a) b = Math.floor(Math.random() * paises.length)
  return [paises[a], paises[b]]
}

// Minijuego: ¿qué país tiene más población?
function PopulationChallenge({ paises }) {
  // Inicialización perezosa para no generar una pareja nueva en cada render
  const [pareja, setPareja] = useState(() => parejaAleatoria(paises))
  const [racha, setRacha] = useState(0)
  const [mensaje, setMensaje] = useState('')
  // Reutilizamos el mismo custom hook que los favoritos
  const [record, setRecord] = useLocalStorage('record', 0)

  function elegir(elegido) {
    const otro = pareja[0] === elegido ? pareja[1] : pareja[0]
    const fmt = (p) => `${p.nombre} (${p.population.toLocaleString('es-ES')})`

    if (elegido.population >= otro.population) {
      const nuevaRacha = racha + 1
      setRacha(nuevaRacha)
      if (nuevaRacha > record) setRecord(nuevaRacha)
      setMensaje(`¡Bien! ${fmt(elegido)} > ${fmt(otro)}`)
    } else {
      setRacha(0)
      setMensaje(`Fallo: ${fmt(otro)} > ${fmt(elegido)}`)
    }
    setPareja(parejaAleatoria(paises))
  }

  return (
    <section>
      <h2>¿Cuál tiene más población?</h2>
      <p>
        Racha: {racha} · Récord: {record}
      </p>
      <div className="lista">
        {pareja.map((pais) => (
          <button key={pais.cca3} className="tarjeta" onClick={() => elegir(pais)}>
            <img src={pais.flags.png} alt={pais.flags.alt || `Bandera de ${pais.nombre}`} />
            <h3>{pais.nombre}</h3>
          </button>
        ))}
      </div>
      {mensaje && <p>{mensaje}</p>}
    </section>
  )
}

export default PopulationChallenge
