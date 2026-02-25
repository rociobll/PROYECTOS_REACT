import { useEffect } from "react"

export default function SearchPage ( {routeParams }) {
useEffect(()=> {
    document.title =`Has buscado ${routeParams.query}`
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

    return (
        <h1>Has buscado {routeParams.query}</h1>
    )
}