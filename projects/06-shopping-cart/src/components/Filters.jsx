import { useId } from "react"
import './Filters.css'
import { useFilters } from "../hooks/useFilters"

export function Filters () {
    const { filters, setFilters} = useFilters()  // estado global
    //const [minPrice, setMinPrice] = useState(0) // estado local (lo quitamos nos guiamos del estado global)
    const minPriceFilteredId = useId()
    const categoryFilteredId = useId()

    console.log( {minPriceFilteredId,
        categoryFilteredId}
    )

    const handleChangeMinPrice = (event) => {
     
        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        // esto esta mal
        // estamos pasando la funcion de actualizar estado nativa de react a componente hijo
        setFilters(prevState => ({
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
                value={filters.minPrice}
                />
                <span>${filters.minPrice}</span>
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