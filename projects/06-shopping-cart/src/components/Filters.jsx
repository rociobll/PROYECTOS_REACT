import { useState, useId } from "react"
import './Filters.css'

export function Filters ( {onChange}) {
    const [minPrice, setMinPrice] = useState(0)
    const minPriceFilteredId = useId()
    const categoryFilteredId = useId()

    console.log( {minPriceFilteredId,
        categoryFilteredId}
    )

    const handleChangeMinPrice = (event) => {
        // algo aqui esta mal
        // DOS FUENTES DE LA VERDAD
        setMinPrice(event.target.value)
        onChange(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        // esto esta mal
        // estamos pasando la funcion de actualizar estado nativa de react a componente hijo
        onChange(prevState => ({
            ...prevState,
            category: event.target.value
        }))
    }
    return (
         <section className="filters">

            <div>
                <label htmlFor={minPriceFilteredId}>Price</label>
                <input 
                type="range" 
                id={minPriceFilteredId}
                min='0'
                max='1000'
                onChange={handleChangeMinPrice}
                />
                <span>${minPrice}</span>
            </div>

            <div>
                <label htmlFor={categoryFilteredId}>Categoría</label>
                <select 
                id={categoryFilteredId} onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    <option value="beauty">Belleza</option>
                    <option value="fragrances">Perfumes</option>

                </select>

                
            </div>

         </section>
    )
}