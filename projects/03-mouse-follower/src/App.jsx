import { useEffect, useState } from "react";

const FollowMouse = () => {

  const [enabled, setEnabled] = useState(false) //estado para saber si el seguidor del mouse está activado o no, por defecto desactivado
  const [position, setPosition] = useState({x: 0, y: 0}) //estado para guardar la posición del mouse, por defecto en (0,0)

  //efecto para seguir el puntero del mouse, se ejecuta cada vez que el estado de enabled cambia, si enabled es true, se agrega el event listener para seguir el mouse, si es false, se remueve el event listener
  useEffect(() => {
    console.log("Efecto", {enabled}) 

    const handleMove = (event) => {
      const { clientX, clientY } = event //obtenemos la posición del mouse
      console.log('handleMove', {clientX, clientY})
      setPosition({x: clientX, y: clientY}) //actualizamos el estado de la posición del mouse, se mueve el seguidor del mouse a la posición del mouse cada vez que se mueve el mouse
    }
    // si el boton esta activo agregamos el event listener para seguir el mouse, se ejecuta cada vez que se mueve el mouse, se actualiza la posición del seguidor del mouse
    if(enabled) {
    window.addEventListener("pointermove", handleMove) //agregamos el event listener para seguir el mouse, se ejecuta cada vez que se mueve el mouse, se actualiza la posición del seguidor del mouse
    }
    //CLEANUP function para remover el event listener para seguir el mouse, se ejecuta cada vez que se mueve el mouse, se actualiza la posición del seguidor del mouse. si no no deja de seguir al ratón y se crean suscripciones encima de la anteriores
    //se ejecuta cuando el componente se desmonta y cuando cambian las dependecias antes de jecutar el efectro de nuevo    return () => {
    return () => {
      console.log('cleanup')
      window.removeEventListener("pointermove", handleMove) //removemos el event listener para seguir el mouse, se ejecuta cada vez que se mueve el mouse, se actualiza la posición del seguidor del mouse
    }
  }, [enabled]) //se ejecuta cada vez que el estado de enabled cambia, es decir, cada vez que se activa o desactiva el seguidor del mouse
 
  // [] -> solo se ejecuta una vez cuando se monta el componente
  // [enabled] -> se ejecuta cuando cambia enabled y cuando se monta el componente
  // undefined -> se ejecuta cada vez que se renderiza el componente




// change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])


   return (
    <>
   <div style={{
      position: "absolute", 
      backgroundColor: "#646cff",
      borderRadius: "50%",
      border: "1px solid #0a0a46",
      opacity: 0.8,
      pointerEvents: "none", //para que el div no interfiera con los eventos del mouse, es decir, para que el mouse pueda interactuar con los elementos debajo del div, como si el div no estuviera ahí
      top: -25, 
      left:-25, 
      width: 50, 
      height: 50,
      transform: `translate(${position.x}px, ${position.y}px)` //para mover el div a la posición del mouse, se actualiza con el event listener del mouse, se mueve a la posición del mouse cada vez que se mueve el mouse
    }}
    />
    <button onClick={() => setEnabled(!enabled)}>
      {enabled ? 'Desactivar' : 'Activar'} seguir puntero</button>
    </>
    )
}


function App() {
 // const [mounted, setMounted] = useState(true) //estado para saber si el componente está montado o no, por defecto desmontado  
 
  return (
    <main>
      <FollowMouse />
   {/* { mounted && <FollowMouse />}
    <button onClick={() => setMounted(!mounted)}>
      Toogle mounted FollowHouse component
    </button> */}
    </main>
  )
}

export default App
