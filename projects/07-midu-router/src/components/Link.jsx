import { EVENTS } from "../consts"


// funcion q cambia url de batta, crea evente y lo va a despachar
// eslint-disable-next-line react-refresh/only-export-components
export function navigate (href) {
  window.history.pushState({}, '', href)
  // crear evento personalizado
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export function Link ({ target,to, ...props }) {
    const handleClick = (event) => {

        const isMainEvent = event.button === 0 // primary click - es el boton primario del raton normalmente de izq
        const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
        const isManageableEvent = target === undefined || target === '_self'

        if(isMainEvent && isManageableEvent && !isModifiedEvent) {  // asi funcionará correctamente la navegación por teclas- comando+click, mayu+click...
        event.preventDefault() // para que no recargue toda la página al navegar de una a otra

        navigate(to)  //navegacion con SPA
    }
}
console.log(props.children)

    return <a onClick= {handleClick} href={to} target={target} {...props} ></a>
}
