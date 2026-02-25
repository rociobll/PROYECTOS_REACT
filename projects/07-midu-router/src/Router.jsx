import { useState, useEffect } from "react"
import { EVENTS } from "./consts"
import { match } from 'path-to-regexp'


export function Router ( { routes= [], defaultComponent: DefaultComponent = () => <h1>404</h1>} ) { 
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

  let routeParams = {}

  const Page = routes.find(({ path }) => {
    if (path === currentPath) return true    //si la ruta e sla misma devuelve true

    // hemos usado path to reges para poder detectar rutas dinamicas
    const matcherUrl = match(path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if(!matched) return false  // si no encuentra current path false

    //guardar los parametros de la url q eran dinámicos
    routeParams = matched.params // p.ej: { query: 'javascript }
    return true
  })?.Component   // si el find devuelve null, no sigue evaluando lo de la derecha

  return Page 
    ? <Page routeParams={routeParams}/> 
    : <DefaultComponent routeParams={routeParams}/>
}
