//import withResults from '../mocks/with-results.json'
import { searchMovies } from '../services/movies.js'
//import withoutResults from '../mocks/no-results.json'
import { useState } from 'react'


export function useMovies ({ search }) {
//const [responseMovies, setResponseMovies] = useState([])
const [movies, setMovies] = useState([])


// si no es string vacio el seaarch, hace la busqueda, si no mostramos que no hay resultados
const getMovies = async () => {
  const newMovies = await searchMovies({search})
  setMovies(newMovies)
}
return { movies, getMovies} 
}