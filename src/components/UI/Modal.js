import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { showUpdateActions } from "../../store/showUpdateSlice";
import classes from "./Modal.module.css";

const portalElement = document.getElementById("overlays");

const Backdrop = () => {
  const dispatch = useDispatch();

  const removeUpdateHandler = () => {
    dispatch(showUpdateActions.remove());
  };

  return <div className={classes.backdrop} onClick={removeUpdateHandler}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {createPortal(<Backdrop />, portalElement)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
