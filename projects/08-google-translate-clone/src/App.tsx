/* eslint-disable react/react-in-jsx-scope */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useStore } from './hooks/useStore';



function App() {
// importamo useStore y traemos fromLanguage y setFromLanguage, y lo pasamos en el return con el payload
const { fromLanguage, setFromLanguage } = useStore()
 
  return (
    
      <div className='App'>
        <h1>Google Translate</h1>
        <button onClick={()=> {
          setFromLanguage('es')  // ahora solo deja poner el tipo d elenguaje definido en los types
        }}>Cambiar a español</button>
        {fromLanguage}
      </div>
   
  )
}

export default App
