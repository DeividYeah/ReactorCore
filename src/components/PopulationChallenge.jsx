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
    const texto = (p) => `${p.nombre} (${p.poblacion.toLocaleString('es-ES')})`

    if (elegido.poblacion >= otro.poblacion) {
      const nuevaRacha = racha + 1
      setRacha(nuevaRacha)
      if (nuevaRacha > record) setRecord(nuevaRacha)
      setMensaje(`¡Bien! ${texto(elegido)} > ${texto(otro)}`)
    } else {
      setRacha(0)
      setMensaje(`Fallo: ${texto(otro)} > ${texto(elegido)}`)
    }
    setPareja(parejaAleatoria(paises))
  }

  return (
    <section>
      <h2>¿Cuál tiene más población?</h2>
      <p>
        Racha: {racha} · Récord: {record}
      </p>
      {pareja.map((pais) => (
        <button key={pais.codigo} onClick={() => elegir(pais)}>
          {pais.nombre}
        </button>
      ))}
      {mensaje && <p>{mensaje}</p>}
    </section>
  )
}

export default PopulationChallenge
