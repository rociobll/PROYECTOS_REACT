import { createContext, useReducer } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

//esta es la lógica de actualizacion de tu estado lo puedes utilizar fuera de react
const initialState = [];
// REDUCER -  TRANSFORMA ESTADO A TRAVES DE UNA ACCIÓN - segun l accion hara una cosa u otra
const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;

  switch (actionType) {
    case "ADD_TO_CART": {
      const { id } = actionPayload;
      const productInCartIndex = state.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state);
        newState[productInCartIndex].quantity += 1;
        return newState;
      }
      //si no esta en el carrito
      return [
        ...state,
        {
          ...actionPayload, // product
          quantity: 1,
        }
      ]
    }
    case "REMOVE_FROM_CART": {
      const { id } = actionPayload;
      return state.filter((item) => item.id !== id); // filtraamos los items que sean diferente y devolvemos el nuevo estado
    }

    case "CLEAR_CART": {
      return initialState;
    }
  }
  return state;
}

//testeando que el reducer funciona para añadir un producto al carrito - se puede hacer pq esta fuera y no hay que ejecutar
// expect(
//     reducer([], {type: 'ADD_TO_CART', payload: {id:1}} )
//     ).toEqual([{ id:1, quantity: 1 }]) 


export function CartProvider({ children }) {
   const [state, dispatch] = useReducer(reducer, initialState)  // el reducer es la funcion q recibe es estado y la funcio para determinar el nuevoe stado, y el estado inicial
    // primero el estado, y luego dispatch que se encarga de enviar las cciones al reducer

    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    })

    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })

    const clearCart = () => dispatch( {type: 'CLEAR_CART'})

  return (
    <CartContext.Provider
      value={{
        cart: state, // ahora le pasamos el estado en la cart
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


  
/*  
const [cart, setCart] = useState([]);
const addToCart = (product) => {
    // comprobar si el producto ya está en el carrito
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);
    // si ya está en carrito
    if (productInCartIndex >= 0) {
      // una forma usando structureClone - clonar carrito crea uno nuevo
      // Clona el carrito, aumenta la cantidad del producto en 1 y actualiza el estado.
      // Así, el producto no se duplica, solo se incrementa su cantidad.
      const newCart = structuredClone(cart);
      newCart[productInCartIndex].quantity += 1;
      return setCart(newCart);
    }
    // si el producto no está en el carrito
    // prevState, es el carrito antes de actualizarse al añadir producto, el resultado es el nuevo carrito, que react asigna como estado
    // 1.setCart guarda el estado actual del carrito.
    // 2.Cuando usas la función (prevState => ...), prevState es una copia del carrito antes de actualizarlo.
    // 3. Añades el nuevo producto y cantidad al array.
    // 4. El resultado se vuelve a guardar como el nuevo estado del carrito.
    // Así, React actualiza el carrito y todos los componentes que lo usan reciben el nuevo estado.
    setCart((prevState) => [
      ...prevState,
      {
        ...product,
        quantity: 1,
      },
    ]);
  };

  // Toma el estado actual del carrito (prevState).º
  // Filtra los productos, dejando solo los que no tienen el mismo id que el producto a eliminar.
  // El resultado es el nuevo carrito, sin ese producto, y se actualiza el estado.
  // Así, el producto se elimina del carrito y el resto permanece igual.
  // el parámetro product es el producto que quieres eliminar del carrito (el que seleccionas para borrar).
  // item es cada producto que ya está en el carrito. - product.id es el id del producto que quieres eliminar.
  const removeFromCart = (product) => {
    setCart((prevState) => prevState.filter((item) => item.id !== product.id));
  };

  const clearCart = () => {
    setCart([]);
  };
 */