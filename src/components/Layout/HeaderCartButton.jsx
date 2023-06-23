import React, { useContext, useEffect, useState } from "react"
import classes from "./HeaderCartButton.module.css"
import CartIcon from "../Cart/CartIcon"
import { CartContext } from "../../store/cart-context"

function HeaderCartButton(props) {
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false)
  const cartCtx = useContext(CartContext)
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => curNumber + item.amount, 0)
  const btnClass = `${classes.button} ${buttonIsHighlighted ? classes.bump : ""}`

  const { items } = cartCtx

  useEffect(() => {
    if (items.length === 0) return
    setButtonIsHighlighted(true)

    const timer = setTimeout(() => setButtonIsHighlighted(false), 300)

    return () => clearTimeout(timer)
  }, [items])

  console.log(buttonIsHighlighted)

  return (
    <button className={btnClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
