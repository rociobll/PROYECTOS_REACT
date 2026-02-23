//import withResults from '../mocks/with-results.json'
//import withoutResults from '../mocks/no-results.json'
import { searchMovies } from "../services/movies.js"
import { useState, useRef, useMemo} from "react"

export function useMovies({ search, sort }) {
  //const [responseMovies, setResponseMovies] = useState([])
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const previousSearch =useRef(search)  // para guardar la busqueda anterior sin renderizar (no recomendable usar varibales fuera del)

  // si no es string vacio el seaarch, hace la busqueda, si no mostramos que no hay resultados
  const getMovies =  useMemo (() => {
    return async () => {
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
}, [search])
  // ordenar peliculas por título - lo malo es que se ejecuta el ordenado cada vez q se cambia un caracter mientras se eercribe
  //para evitar usar useMemo - memorizar computaciones que no queremosque se recalculaen a no se que cambien las dependencias que le indiquemos. 
  // no es necesario usarlo en todos lo compoenntes, solo si tienes un problema de rendimiento
/*   const sortedMovies = sort
  ? [...movies].sort((a, b)=> a.title.localeCompare(b.title))
  : movies

  console.log('render')  //vuelve a renderizar-reordenar cada vez que cambia el input mientras escribimos
 */

  const sortedMovies = useMemo(()=> {
    return sort
    ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies
  }, [sort, movies])  // cuando cambie el sort o las peliculas, se ejecutara el ordenemiento, si no no

  return { movies: sortedMovies, getMovies, loading, error, sort }

}
