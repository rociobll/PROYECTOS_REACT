import { createContext, useState } from "react";

// 1. - crear context - este es el que tenemos que consymir
// eslint-disable-next-line react-refresh/only-export-components
export const FiltersContext = createContext()

// 2. crear el provider para proveer el contexto - este provee de acceso al contexto

export function FiltersProvider ({ children }) {
    const [ filters, setFilters]= useState({
        category:'all',
        minPrice: 0
    })
    return(
        <FiltersContext.Provider value= {{
            filters,
            setFilters
        }}
        >
            {children}
        </FiltersContext.Provider>
    )
}
