
import { useState, useEffect } from 'react'
import './App.css'
import { EVENTS } from './consts'



// funcion q cambia url de batta, crea evente y lo va a despachar
function navigate (href) {
  window.history.pushState({}, '', href)
  // crear evento personalizado
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

function HomePage () {
  return (
    <>
    <h1>Home</h1>
    <p>Esta es una página de ejemplo para crear un React Router desde cero</p>
    <button onClick={() => navigate ('/about')}>Ir a sobre nosotros</button>
    </>
  )
}

function AboutPage () {
  return (
    <>
    <h1>About</h1>
    <div>
      <p>Hola me llamo Rocío y esto creando un clone de React router</p>
      <img src="https://ameche.org/wp-content/uploads/Claves-mejor-imagen-personal.jpg" alt="imagen de la creadora de la web" />
    </div>
      <button onClick={()=> navigate ('/')}>Ir a la home</button>
    
    </>
  )
}


function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect  (() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)  // para que navegue haci atras - popstate

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])


  return (
    
    <main>
      {currentPath === '/' && <HomePage />}
      {currentPath === '/about' && <AboutPage />}
    </main>
    
  )
}

export default App
