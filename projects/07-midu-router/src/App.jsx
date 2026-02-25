import "./App.css"
import HomePage from "./pages/Home"
//import AboutPage from "./pages/About" - import estático
import Page404 from "./pages/404"
import SearchPage from "./pages/Search"
// importar de forma dinamica los components, hasta que no los necesitamos no los renderiza
import { lazy } from "react"
import { Router } from "./Router"
import { Route } from "./Route"

// import dinámico - solo se importa cuando lo necesitamos - solo enc aso de que se ejecute esa función
// te crea el componente vacío, este componente hasta que no se vaya a renderizar no va aejecutar ese import
// y cuando lo necesite ejecutaré esta función para importar el componente
const LazyAboutPage = lazy(() => import ('./pages/About.jsx'))  // import dinámico




const appRoutes = [
  // {
  //   path: "/",
  //   Component: HomePage,
  // },
  // {
  //   path: "/about",
  //   Component: AboutPage,
  // },
  {    // Rutas con PARAMETROS
    path: "/search/:query",
    Component: SearchPage,
  },
];

function App() {
  return (
    <main>
       {/* hay parte de la appp en estado suspendido y hay que utilizar suspense para que funcione */}
      <Suspense fallback= {<div>Loading...</div>}>
        <Router routes={appRoutes} defaultComponent={Page404} >
          <Route path= '/' Component={HomePage} />
          <Route path='/about' Component={LazyAboutPage}/>
        </Router>
      </Suspense>
      {/*  {currentPath === '/' && <HomePage />}
      {currentPath === '/about' && <AboutPage />} */}
    </main>
  );
}

export default App;
