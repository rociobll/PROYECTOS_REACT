import { useEffect } from "react"

// custom hook que te saca los query params - no sirece para Servre as rendering
function useQueryParams () {
    const search = window.location.search
    const params = new URLSearchParams(search)
    return Object.fromEntries(params.entries())
}

export default function SearchPage ( {routeParams }) {
    const { limit } = useQueryParams()

    console.log(limit)

useEffect(()=> {
    document.title =`Has buscado ${routeParams.query}`
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

    return (
        <h1>Has buscado {routeParams.query}</h1>
    )
}