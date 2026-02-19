import { useState, useEffect } from 'react'

export function useCatImage ({ fact }) {
  const [image, setImage] = useState()
  // efecto para recuperar la imagen cada vz que tenenos una cita nueva
  useEffect(() => {
    if (!fact) return // si fact es false, no hace nada, si fact es true, hace lo siguiente

    const threeFirstWords = fact.split(' ', 3).join(' ') // split es una función que convierte un string en un array, join es una función que convierte un array en un string, en este caso split(' ', 3) convierte el string fact en un array de palabras y join(' ') convierte el array de palabras en un string con las primeras 3 palabras del dato
    console.log(threeFirstWords)

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`)
      .then(res => res.json())
      .then(response => {
        console.log(response)
        const { url } = response
        setImage(url) // response es un objeto con una propiedad url que es la url de la imagen que queremos mostrar
      })
  }, [fact]) // ahora el efecto se ejecuta cuando el componente se monta y cuando cabia el fact

  return { image }
}
