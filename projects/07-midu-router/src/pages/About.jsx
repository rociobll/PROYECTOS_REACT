//import { navigate } from '../App'
import { Link } from '../components/Link'

const i18n= {
  es:{
    title: 'Sobre nosotros',
    button: 'Ir a INICIO',
    description: 'Me llamo Rocío y estoy creando un clon de React Router'
  },
  en: {
    title: 'Abour us',
    button: 'Go to HOME',
    description: 'My name is rocio, and I am crearing a clone of React Router'
  }
}


const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}


console.log('HOLA - estamos importando el archivo about.jsx sin necesitarlo al cargar home')
// que nos lleguen los routeParams para poder gestionar el idiomna
export default function AboutPage ( {routeParams}) {
  const i18n = useI18n(routeParams.lang ?? 'es') // por defecto español
  return (
    <>
    <h1>{i18n.title}</h1>
    <div>
      <p>{i18n.description}</p>
      <img src="https://ameche.org/wp-content/uploads/Claves-mejor-imagen-personal.jpg" alt="imagen de la creadora de la web" />
    </div>
      {/* <button onClick={()=> navigate ('/')}>Ir a la home</button> */}
      <Link to='/'>{i18n.button}</Link>
    
    </>
  )
}