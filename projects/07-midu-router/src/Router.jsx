import { useState, useEffect, Children } from "react"
import { EVENTS } from "./consts"
import { match } from 'path-to-regexp'
import { getCurrentPath } from "./utils"


// eslint-disable-next-line no-unused-vars
export function Router ( { children, routes= [], defaultComponent: DefaultComponent = () => <h1>404</h1>} ) { 
  // acceder al chilgren y a sus props
const [currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect  (() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath())
    }
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)  // para que navegue haci atras - popstate

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}
//añadir rutas que vienen del children <Route/> components
// Children propiedad de ract, mapea todos los children, si no es una ruta devuelve null y si no devuelve los props
// primero se le pasan los childre y 2 parametro el maper que quieres hacer
const routesFromChildren = Children.map(children, ({props, type}) => {
    const { name } = type
    console.log({props, type})
    const isRoute = name === 'Route'  // para saber si es una ruta

    return  isRoute ? props : null  // si es ruta devuelve props y si no null
})
    // console.log(routesFromChildren)
    //concatenar las rutas que nos estan pasando por props con las rutas que nos estan pasando por children
    const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true    //si la ruta e sla misma devuelve true

    // hemos usado path-to-regex para poder detectar rutas dinamicas
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
