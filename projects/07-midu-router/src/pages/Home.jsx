//import { navigate } from '../App.jsx'

import { Link } from "../components/Link";

export default function HomePage () {
  return (
    <>
    <h1>Home</h1>
    <p>Esta es una página de ejemplo para crear un React Router desde cero</p>
    {/* <button onClick={() => navigate ('/about')}>Ir a sobre nosotros</button> */}
    <Link to='/about'>Ir a sobre nosotros</Link>
    </>
  )
}