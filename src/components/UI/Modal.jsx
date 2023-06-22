import React from "react"
import classes from "./Modal.module.css"
import { createPortal } from "react-dom"

const Backdrop = (props) => <div className={classes.backdrop} onClick={props.onClose} />
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}

const portalElement = document.getElementById("overlays")

function Modal(props) {
  return (
    <React.Fragment>
      {createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </React.Fragment>
  )
}

export default Modal
