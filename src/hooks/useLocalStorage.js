import { useState, useEffect } from 'react'

// Igual que useState, pero el valor se guarda en localStorage
// y se recupera al recargar la página.
export function useLocalStorage(clave, valorInicial) {
  // Inicialización perezosa: solo se lee localStorage en el primer render
  const [valor, setValor] = useState(() => {
    const guardado = localStorage.getItem(clave)
    return guardado !== null ? JSON.parse(guardado) : valorInicial
  })

  // Sincroniza con un sistema externo (localStorage) cada vez que cambia el valor
  useEffect(() => {
    localStorage.setItem(clave, JSON.stringify(valor))
  }, [clave, valor])

  return [valor, setValor]
}
