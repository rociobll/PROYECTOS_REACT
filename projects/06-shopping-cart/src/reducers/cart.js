// REDUCER -  TRANSFORMA ESTADO A TRAVES DE UNA ACCIÓN - segun l accion hara una cosa u otra
export const cartReducer = (state, action) => {
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