import React, { useReducer } from "react"

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
      const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id)
      const existingCartItem = state.items[existingCartItemIndex]

      let updatedItems

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        }
        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem
      } else {
        updatedItems = state.items.concat(action.item)
      }

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
  console.log(cartState.items)
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
