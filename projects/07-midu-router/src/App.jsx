import "./App.css";
import { Router } from "./Router";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import Page404 from "./pages/404";
import SearchPage from "./pages/Search";

const appRoutes = [
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
  {    // Rutas con PARAMETROS
    path: "/search/:query",
    Component: SearchPage,
  },
];

function App() {
  return (
    <main>
      <Router routes={appRoutes} defaultComponent={Page404} />

      {/*  {currentPath === '/' && <HomePage />}
      {currentPath === '/about' && <AboutPage />} */}
    </main>
  );
}

export default App;
