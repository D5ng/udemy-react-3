import React, { useReducer } from "react"

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
      const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id)
      const existingCartItem = state.items[existingCartItemIndex]

      let updatedItems = existingCartItem
        ? state.items.map((item) => (item.id === action.item.id ? { ...item, amount: item.amount + action.item.amount } : item))
        : state.items.concat(action.item)

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      }
    }

    case "REMOVE": {
      const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id)
      const existingCartItem = state.items[existingCartItemIndex]
      const updatedTotalAmount = state.totalAmount - existingCartItem.price

      let updatedItems =
        existingCartItem.amount === 1
          ? state.items.filter((item) => item.id !== action.id)
          : state.items.map((item) => (item.id === action.id ? { ...item, amount: item.amount - 1 } : item))

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      }
    }

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
