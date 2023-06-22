import React from "react"

export const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
})

export const CartContextProvider = ({ children }) => {
  const addItemToCartHandler = (item) => {}

  const removeItemToCartHandler = (id) => {}

  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  }

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}
