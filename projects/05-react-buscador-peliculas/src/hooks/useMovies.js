import withResults from '../mocks/with-results.json'
import withoutResults from '../mocks/no-results.json'
import { useState } from 'react'


export function useMovies ({ search }) {
const [responseMovies, setResponseMovies] = useState([])

const movies = responseMovies.Search

const mappedMovies = movies?.map(movie => ({
  id: movie.imdbID,
  title: movie.Title,
  year: movie.Year,
  poster: movie.Poster
}))

// si no es string vacio el seaarch, hace la busqueda, si no mostramos que no hay resultados
const getMovies = () => {
  if (search) {
    setResponseMovies(withResults)
  } else {
    setResponseMovies(withoutResults)
  }
}
return { movies: mappedMovies, getMovies} 
}