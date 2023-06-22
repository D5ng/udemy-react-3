import React, { useReducer } from "react"

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedItems = state.items.concat(action.item)
      const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      }

    case "REMOVE":
      return

    default:
      return state
  }
}

const initialCartState = {
  items: [],
  totalAmount: 0,
}

export const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
})

export const CartContextProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialCartState)

  const addItemToCartHandler = (item) => dispatchCartAction({ type: "ADD", item })
  const removeItemToCartHandler = (id) => dispatchCartAction({ type: "REMOVE", id })
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  }

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}
