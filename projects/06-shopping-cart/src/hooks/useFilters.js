import { useContext } from "react";
import { FiltersContext } from "../context/filters";


export function useFilters() {
  const {filters, setFilters} = useContext(FiltersContext)

  // IMPORTANTE - de todo el array de productos solo mostraremos aquellos que el precio sea mayor a 0 y que si filter category es all lo mostramos, y lso que tengan la categoria igual q la del filtro los vamos a mostrar
  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.price >= filters.minPrice &&
        (
          filters.category === "all" || 
          product.category === filters.category)
      );
    });
  };
  return { filters, filterProducts, setFilters };
}