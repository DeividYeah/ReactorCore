import { useState, useEffect } from 'react'

// Hook reutilizable: pide una URL y devuelve { datos, cargando, error }.
// El efecto depende solo de `url`: si cambia, se vuelve a pedir.
export function useFetch(url) {
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // AbortController cancela la petición si el componente se desmonta
    // o si la url cambia antes de que llegue la respuesta.
    const controller = new AbortController()
    setCargando(true)
    setError(null)

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => {
        setDatos(json)
        setCargando(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setCargando(false)
      })

    // Cleanup
    return () => controller.abort()
  }, [url])

  return { datos, cargando, error }
}
