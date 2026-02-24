import { createContext, useState } from "react";

// 1. - crear context - este es el que tenemos que consymir
// eslint-disable-next-line react-refresh/only-export-components
export const FiltersContext = createContext()  // solo se crea una vez (como un singleton)

// 2. crear el provider para proveer el contexto - este provee de acceso al contexto

export function FiltersProvider ({ children }) {
    const [ filters, setFilters]= useState({
        category:'all',
        minPrice: 0
    })
    return(
        <FiltersContext.Provider value= {{      // valor que queremnos proveer
            filters,
            setFilters
        }}
        >                                       
            {children}              
        </FiltersContext.Provider>                  //donde lo queremos proveer, aqui childre, q es toda la app
    )
}

// cuando creas un contexto, un provider, el contexto tiene que tener un valor. cuando en useFilter estamos leyendo el context
// queremos que nos devuelva el valor que es
