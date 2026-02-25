// REDUCER -  TRANSFORMA ESTADO A TRAVES DE UNA ACCIÓN - segun l accion hara una cosa u otra
//esta es la lógica de actualizacion de tu estado lo puedes utilizar fuera de react

export const cartInitialState =  JSON.parse(window.localStorage.getItem('cart')) || []   // añadimos persistencia - local storage // cogemos lo que hay en el carrito y lo guardamos

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_ CART'
}

//update LOCAL STORAGE with state for cart
export const updateLocalStorage = state => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;

  switch (actionType) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const { id } = actionPayload;
      const productInCartIndex = state.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state);
        newState[productInCartIndex].quantity += 1;
        return newState;
      }
      //si no esta en el carrito
      // antes de hacer cualquier return, actualizar con nuevo estado
      const newState = [
        ...state,
        {
          ...actionPayload, // product
          quantity: 1,
        }
      ]
       updateLocalStorage(newState) 
       return newState
    }

    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      const { id } = actionPayload;
      const newState= state.filter((item) => item.id !== id); // filtraamos los items que sean diferente y devolvemos el nuevo estado
      updateLocalStorage(newState)
      return newState
    }

    case CART_ACTION_TYPES.CLEAR_CART: {
      updateLocalStorage(cartInitialState)
      return cartInitialState
    }
  }

  return state
}

//testeando que el reducer funciona para añadir un producto al carrito - se puede hacer pq esta fuera y no hay que ejecutar
// expect(
//     reducer([], {type: 'ADD_TO_CART', payload: {id:1}} )
//     ).toEqual([{ id:1, quantity: 1 }]) 