import React from "react";
import "./cart-top.css";
import btnDownload from "../../img/direct-download 1.png";
const CartTop = () => {
  return (
    <div className="cart-top cart-top__pd">
      <div className="cart-top__data-today">
        <span className="cart-top__data-today--bold">Wed,</span>
        <span>June 10</span>
      </div>
      <div className="cart-time-wrap">
        <div className="cart-time">
          <span className="cart-time__gray">06.02.00</span>
          <progress max="100" value="25">
            <span id="value"></span>
          </progress>
        </div>
        <div className="cart-time-downl">
          <img src={btnDownload} alt="icon" />
        </div>
      </div>
    </div>
  );
};
export default CartTop;