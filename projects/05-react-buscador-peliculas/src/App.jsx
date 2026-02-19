import './App.css'
import responseMovies from './mocks/with-results.json'
import noResults from './mocks/no-results.json'
import { Movies } from './components/Movies'

function App() {
  
const movies = responseMovies.Search

  return (
    <div className="page">
      <header>
        <h1>Buscador de Películas</h1>
        <form className="form">
          <input placeholder='Avengers, Star War, Yhe MAtrix...' />
          <button type='submit'>Search</button>
          </form>
      </header>
    
    <main>
      {
       <Movies movies={movies}/>
      }

      Aqí iran los resultados de las peliculas
    </main>
        
     
    </div>
  )
}

export default App
