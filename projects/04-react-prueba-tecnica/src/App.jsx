import React from 'react'
import './App.css'
import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'

// const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_RANDOM_IMAGE = `https://cataas.com/cat/says/${text}?fontSize=50&fontColor=red&json=true`

export function App () {
  const { fact, refreshFact } = useCatFact()
  const { image } = useCatImage({ fact }) // el estado de las imagenes lo ponemos dentro del customhook useCatImage porque es el que se encarga de recuperar la imagen, así el componente App solo se encarga de mostrar la imagen y el dato, y no tiene que preocuparse por cómo se recupera la imagen, lo que hace que el código sea más limpio y fácil de mantener
  // const [factError, setFactError] = useState()

  /*
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => {
        if (!res.ok) { // si la respuesta no es ok, lanza un error
          setFactError(`Error fetching data: ${res.status} ${res.statusText}`)
        }
        return res.json() // res es la respuesta de la api, res.json() es una función que convierte la respuesta en un objeto json
      })
      .then(data => {
        const { fact } = data
        setfact(fact) // data es un objeto con una propiedad fact que es el dato que queremos mostrar
      })
  } */

  // efecto para llamar a la api de gatitos y mostrar un dato (una cita/frase) cada vez que se renderiza el componente
  // eslint-disable-next-line spaced-comment
  //useEffect(() => {
  //  getRandomFact().then(newFact => setFact(newFact)) // es lo mismo que .then(setFact) porque setFact es una función que recibe un argumento y lo asigna al estado fact, entonces cuando getRandomFact devuelve el nuevo dato, se llama a setFact con ese dato y se actualiza el estado fact, lo que hace que se vuelva a renderizar el componente y se muestre el nuevo dato
  //   .catch(error => setFactError(`Error fetching data: ${error.message}`)) // si hay un error al llamar a la api, se captura el error y se actualiza el estado factError con un mensaje de error, lo que hace que se vuelva a renderizar el componente y se muestre el mensaje de error
  // }, []) // el array vacío [] hace que el efecto se ejecute solo una vez, cuando el componente se monta

  /*   // efecto para recuperar la imagen cada vz que tenenos una cita nueva
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
  }, [fact]) // ahora el efecto se ejecuta cuando el componente se monta y cuando cabia el fact */

  const handleClick = async () => {
    refreshFact() // cuando se hace click en el botón, se llama a la función refreshFact que recupera un nuevo dato de la api de gatitos y actualiza el estado fact con ese nuevo dato, lo que hace que se vuelva a renderizar el componente y se muestre el nuevo dato
  }

  return (
    <main>
      <h1>App de gatitos</h1>

      <button onClick={handleClick}>Get new fact</button>
      {/* <section> */}
      {fact && <p>{fact}</p>} {/* si fact es true, muestra el párrafo con el dato, si fact es false, no muestra nada */}
      {image && <img src={image} alt={`Image extracted using first 3 words for ${fact}`} />} {/* si image es true, muestra la imagen, si image es false, no muestra nada */}
      {/* </section> */}
    </main>
  )
}
