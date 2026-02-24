import { useContext } from "react";
import { CartContext } from "../context/cart";

export const useCart = () => {
    const context = useContext(CartContext)

    if (context === undefined) {
        throw new Error('useCart no se puede utilizar aqui, se necesita un provider')
    }
    return context
}