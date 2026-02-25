import './App.css'
import { Router } from './Router'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import Page404 from './pages/404'

const appRoutes = [
 {
          path: '/',
          Component: HomePage
        },
        {
          path:'/about',
          Component: AboutPage
        },
      
]

function App() {
  
  return (
    
    <main>
      <Router routes = {appRoutes} defaultComponent={Page404}
      />

     {/*  {currentPath === '/' && <HomePage />}
      {currentPath === '/about' && <AboutPage />} */}
    </main>
    
  )
}

export default App
