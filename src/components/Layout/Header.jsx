import React from "react"
import classes from "./Header.module.css"
import mealImage from "../../assets/meals.jpg"

function Header() {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <button>Cart</button>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImage} alt="A Table full of delicious food!" />
      </div>
    </React.Fragment>
  )
}

export default Header
