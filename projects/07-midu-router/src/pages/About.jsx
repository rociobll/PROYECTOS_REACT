//import { navigate } from '../App'
import { Link } from '../Link'


export default function AboutPage () {
  return (
    <>
    <h1>About</h1>
    <div>
      <p>Hola me llamo Rocío y esto creando un clone de React router</p>
      <img src="https://ameche.org/wp-content/uploads/Claves-mejor-imagen-personal.jpg" alt="imagen de la creadora de la web" />
    </div>
      {/* <button onClick={()=> navigate ('/')}>Ir a la home</button> */}
      <Link to='/'>Ir a la home</Link>
    
    </>
  )
}