function ListOfMovies({ movies }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.imdbID}>
          <h2>{movie.Title}</h2>
          <p>{movie.Year}</p>
          <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
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
          : <NoResults /> 
      
    )
}