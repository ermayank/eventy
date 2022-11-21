import React from "react";
import PaypalButton from "../components/PaypalButton";

const Modal = ({ open, onClose, product }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <div className="modalRight">
          <p className="closeBtn" onClick={onClose}>
            X
          </p>
          <div className="content">
            <p>
              Total Amount : <b>${product.price}</b>
              <br></br>
            </p>
            <PaypalButton product={product} onDone={onClose}></PaypalButton>
          </div>
          <div className="btnContainer"></div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
