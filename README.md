# Reactor Core · Explorador de países

Misión M3 de Programación Web I (U-tad). App en **React 19 + Vite** que carga
los países de la API pública [REST Countries](https://restcountries.com) y permite:

- Buscar por nombre (en español) y filtrar por región.
- Marcar países como favoritos (se guardan en `localStorage`) y ver solo los favoritos.
- Abrir una ficha de detalle con capital, superficie, densidad e idiomas.
- **Reto de población**: minijuego en el que eliges cuál de dos países tiene más
  habitantes, con racha y récord guardado.

## Cómo arrancarlo

```bash
npm install
npm run dev
```

Y abrir la URL que muestra Vite (normalmente http://localhost:5173).
Hace falta conexión a internet para la API.

## Estructura

```
src/
  main.jsx                 punto de entrada
  App.jsx                  estado principal y valores derivados
  hooks/
    useFetch.js            custom hook: petición con AbortController
    useLocalStorage.js     custom hook: useState persistente
  components/
    SearchBar.jsx          input de búsqueda (controlado)
    RegionFilter.jsx       select de región (controlado)
    CountryList.jsx        lista con key = cca3
    CountryCard.jsx        tarjeta de un país
    CountryDetail.jsx      ficha de detalle
    PopulationChallenge.jsx  minijuego de población
```

## Decisiones

- **Estado mínimo.** En `App` solo viven la búsqueda, la región, el modo, el filtro
  de favoritos, los códigos favoritos y el código del país seleccionado. La lista
  filtrada, el país seleccionado, el contador y la densidad se **derivan** en cada render.
- **Lifting state.** Los filtros y los favoritos están en `App` porque los usan
  varios componentes; los hijos reciben el valor y un callback (`onCambiar`,
  `onToggleFavorito`, `onVerDetalle`).
- **Efectos solo para sistemas externos:** la petición HTTP (`useFetch`, con cleanup
  que aborta la petición), `localStorage` (`useLocalStorage`) y el título de la pestaña.
- **Keys estables:** se usa `cca3` (código ISO del país), nunca el índice.
- **Reto bonus:** dos custom hooks, y `useLocalStorage` se reutiliza para favoritos y récord.

## Uso de IA

<!-- REVISAR ANTES DE ENTREGAR: tiene que ser verdad -->

- **Herramienta:** Claude (Anthropic).
- **Qué se hizo con IA:** la mayor parte del código (componentes, los dos custom
  hooks y el minijuego) y el borrador de este README los generó Claude a partir de
  mi petición. Yo elegí la idea final, lo probé y repasé el código para entenderlo
  y poder explicar cada parte.
- **Prompt real:**
  > "En la asignatura de Programacion Web I se ha añadido esta tarea, quiero que me
  > ayudes a resolverla, debe tener un codigo sencillo que se ajuste al temario de
  > la asignatura, sin una interfaz demasiado elaborada" (adjuntando el enunciado).
- **Cómo lo verifiqué:** arranqué la app con `npm run dev` y probé búsqueda, filtro
  por región, favoritos (recargando la página), detalle y el reto. Revisé que no
  hubiera errores en consola y que cada `useEffect` tuviera sus dependencias.
- **Qué escribí a mano:** <!-- completar si cambias algo -->

## Autopsia

1. **Lista filtrada derivada en cada render, sin `useMemo` ni estado.** Filtrar
   ~250 países es barato, así que lo calculo directamente. Descarté guardar
   `paisesFiltrados` en un `useState` sincronizado con un `useEffect`, porque
   duplicaría el estado y podría desincronizarse. Si la lista fuese enorme usaría `useMemo`.
2. **`useLocalStorage` guarda con un `useEffect` en vez de escribir en el handler.**
   Así cualquier `setValor` queda persistido sin repetir código. La alternativa
   (llamar a `localStorage.setItem` dentro de `toggleFavorito`) evitaba un efecto,
   pero obligaba a acordarse de guardar en cada sitio que cambia el valor.
