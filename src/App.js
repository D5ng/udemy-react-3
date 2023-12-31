import React, { useState } from "react"
import Header from "./components/Layout/Header"
import Meals from "./components/Meal/Meals"
import Cart from "./components/Cart/Cart"
import { CartContextProvider } from "./store/cart-context"

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)
  const showCartHandler = () => setCartIsShown(true)
  const hideCartHandler = () => setCartIsShown(false)

  return (
    <CartContextProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  )
}

export default App
