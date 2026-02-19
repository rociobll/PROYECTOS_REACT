const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

/* export const getRandomFact = () => {
  return fetch(CAT_ENDPOINT_RANDOM_FACT).then((res) =>
    res.json.then((data) => {
      const { fact } = data
      return fact
    })
  )
} */

// función asíncrona para recuperar el dato de la api de gatitos, esta función se puede usar en cualquier parte del código, no solo en el componente App
export const getRandomFact = async () => {
  const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
  const data = await res.json()
  const { fact } = data
  return fact
}
