function ListOfMovies({ movies }) {
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li className='movie' key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={`Poster of ${movie.Title}`} />
        </li>
      ))}
    </ul>
  );
}

function NoMoviesResult() {
  return <p>No se encontraron películas</p>;
}

export function Movies( { movies }) {
//const movies = responseMovies.Search
  const hasMovies = movies?.length > 0
    return (
            
         hasMovies
          ? <ListOfMovies movies={movies} />
          : <NoMoviesResult /> 
      
    )
}