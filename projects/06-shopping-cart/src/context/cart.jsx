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
            // Clona el carrito, aumenta la cantidad del producto en 1 y actualiza el estado.
            // Así, el producto no se duplica, solo se incrementa su cantidad. 
            const newCart = structuredClone(cart)
            newCart[productInCartIndex].quantity += 1
            return setCart(newCart)
        }
        // si el producto no está en el carrito
        // prevState, es el carrito antes de actualizarse al añadir producto, el resultado es el nuevo carrito, que react asigna como estado
        // 1.setCart guarda el estado actual del carrito.
        // 2.Cuando usas la función (prevState => ...), prevState es una copia del carrito antes de actualizarlo.
        // 3. Añades el nuevo producto y cantidad al array.
        // 4. El resultado se vuelve a guardar como el nuevo estado del carrito.
        // Así, React actualiza el carrito y todos los componentes que lo usan reciben el nuevo estado.
                setCart(prevState => ([
            ...prevState,
            {
                ...product,
                quantity: 1
            }
        ]))
    }

    // Toma el estado actual del carrito (prevState).º
    // Filtra los productos, dejando solo los que no tienen el mismo id que el producto a eliminar.
    // El resultado es el nuevo carrito, sin ese producto, y se actualiza el estado.
    // Así, el producto se elimina del carrito y el resto permanece igual.
    // el parámetro product es el producto que quieres eliminar del carrito (el que seleccionas para borrar).
    // item es cada producto que ya está en el carrito. - product.id es el id del producto que quieres eliminar.
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
