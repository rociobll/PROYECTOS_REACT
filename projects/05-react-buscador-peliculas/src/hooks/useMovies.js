//import withResults from '../mocks/with-results.json'
import { searchMovies } from "../services/movies.js"
//import withoutResults from '../mocks/no-results.json'
import { useState, useRef } from "react"

export function useMovies({ search }) {
  //const [responseMovies, setResponseMovies] = useState([])
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const previousSearch =useRef(search)  // para guardar la busqueda anterior sin renderizar

  // si no es string vacio el seaarch, hace la busqueda, si no mostramos que no hay resultados
  const getMovies = async () => {
    if (search === previousSearch.current) return  // si es la misma busqueda no hacemos nada
    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search 
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  return { movies, getMovies, loading, error };
}
