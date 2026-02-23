import { products as initialProducts } from './mocks/product.json'
import { Products } from "./components/Products"
import { useState } from 'react'

function App() {
  const [products]= useState(initialProducts)
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

  // IMPORTANTE - de todo el array de productos solo mostraremos aquellos que el precio sea mayor a 0 y que si filter category es all lo mostramos, y lso que tengan la categoria igual q la del filtro los vamos a mostrar
  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice &&
        (
          filters.category ==='all' ||
          product.category === filters.category
        )
      )
    })
  }
  const filteredProducts = filterProducts(products)
  
  return (
    //<h1>Shopping Cart </h1>
    <Products products={filteredProducts}/>
  )
}

export default App
