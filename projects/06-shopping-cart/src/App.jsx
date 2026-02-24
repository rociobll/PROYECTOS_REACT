import { products as initialProducts } from "./mocks/product.json";
import { Products } from "./components/Products";
import { useContext, useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { IS_DEVELOPMENT } from "./config";
import { FiltersContext } from "./context/filters";

function useFilters() {
  const {filters, setFilters} = useContext(FiltersContext);

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

function App() {
  const [products] = useState(initialProducts);
  const { filters, filterProducts, setFilters } = useFilters();
  const filteredProducts = filterProducts(products);

  return (
    <>
      <Header changeFilters={setFilters} />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer filters={filters}></Footer>}
    </>
  );
}

export default App;
