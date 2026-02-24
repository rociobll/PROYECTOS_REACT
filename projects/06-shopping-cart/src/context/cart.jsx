import { createContext, useState } from "react";



// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext()

export function CartProvider ({children }) {
    const [ cart, setCart] = useState([])

    const addToCart = product => {
        // comprobar si el producto ya está en el carrito
        const productInCartIndex = cart.findIndex(item => item.id === product.id)
        // si ya está en carrito
        if (productInCartIndex >= 0) {
            // una forma usando structureClone - clonar carrito crea uno nuevo
            const newCart = structuredClone(cart)
            newCart[productInCartIndex].quantity += 1
            return setCart(newCart)
        }
        // si el producto no está en el carrito
        setCart(prevState => ([
            ...prevState,
            {
                ...product,
                quantity: 1
            }
        ]))
    }

    const removeFromCart = product => {
        setCart(prevState => prevState.filter(item => item.id !== product.id))

        
    }

    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value= {{
            cart,
            addToCart,
            removeFromCart,
            clearCart
        }}
        >
            {children}
        </CartContext.Provider>
    )

}
