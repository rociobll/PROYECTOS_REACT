import './App.css'
import { useEffect, useRef, useState } from 'react' // te permite crear un referencia mutable que persiste durante todo el ciclo de vida del componente. Su valor no se reinicia cada vez que el componente se renderiza, a diferencia de las variables normales que se reinician cada vez que el componente se renderiza. Esto es útil para almacenar valores que no necesitan causar una nueva renderización cuando cambian, como referencias a elementos del DOM o valores que quieres mantener entre renders sin causar un nuevo renderizado.
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'

// custom hook
function UseSearch () {
const [search, updateSearch]= useState('')  // asi se esta renderizando cada vez que estamos escribiendo en el input, cada vez que escribimos en el input se actualiza el estado query y se vuelve a renderizar el componente App, lo que hace que se vuelva a ejecutar el hook useMovies y se vuelva a recuperar las peliculas con la nueva query, lo que hace que se muestren las nuevas peliculas en la pantalla, esto es lo que queremos, pero si queremos evitar que se vuelva a renderizar cada vez que escribimos en el input, podemos usar un ref para almacenar el valor del input y solo actualizar el estado query cuando se envía el formulario, de esta manera solo se vuelve a renderizar cuando se envía el formulario y no cada vez que escribimos en el input, esto es útil para evitar renderizados innecesarios y mejorar el rendimiento de la aplicación
const [error, setError] = useState(null)
const isFirstInput = useRef(true)  // para saber si el usuario ha utilizado o no el input por primera vez, que valide a partir de que use el input- no le salga mensaje de error directamente

// validar formulario de forma controlada
useEffect(() => {
  if (isFirstInput.current){
    isFirstInput.current = search === ''  // al usar una referencia no re-renderiza
    return
  }
  if (search === '') {
    setError('No se puede buscar un pelicula vacía')
    return
  }

  //si todo es un número 
  if (search.match(/^\d+$/)) {
  setError('No se puede buscar una oelicula con un número')
  return
  }

  if(search.length < 3) {
    setError('La búsqueda debe tener al menos 3 caracteres')
    return
  }
  
  setError(null)
}, [search])

return { search, updateSearch, error }
}

function App() {
const { search, updateSearch, error } = UseSearch()
const { movies, loading, getMovies } = useMovies({ search })
//const inputRef = useRef() - cuando usas use ref valos q persiste entre render

const handleSubmit = (event) => {
  event.preventDefault() // Evita que el formulario se envíe por defecto
  getMovies()
  //console.log({search}) 

 // const {query} = Object.fromEntries (
   // new window.FormData(event.target)
   
 // const value = inputRef.current.value  // crea un objeto que desde el current loq ue cambia es lo que viene despues, el value 
  //console.log(value)
}

// controlar - estamos tirando de estado y el estado es asincrono
 const handleChange = (event) => {
  updateSearch(event.target.value)  // cada vez que detectamos un cambio en en onChange ,se actualiza el estado y eso lo veremos en el input
}  



  return (
    <div className="page">
      <header>
        <h1>Buscador de Películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input 
          style={{
            border: '1px solid transparent',
            borderColor: error ? 'red' : 'transparent'
          }}
          onChange={handleChange} 
          value={search} 
          name='query' 
          // ref={inputRef} 
          placeholder='Avengers, Star War, Yhe MAtrix...' />
          <button type='submit'>Search</button>
          </form>
          {error && <p style={{ color: 'red'}}>{error}</p>}
      </header>
    
    <main>
      {
        loading ? <p>Cargando...</p> : <Movies movies={movies}/>
      }

    </main>
        
     
    </div>
  )
}

export default App
