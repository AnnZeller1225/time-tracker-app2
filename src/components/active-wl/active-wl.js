import React from "react";
import { connect } from "react-redux";
import './active-wl.css';
import {
  bookAddedToCart,
  bookRemovedFromCart,
  allBooksRemovedFromCart,
} from "../../actions";

// import buttonStop from "./stop .png";
// import buttonPause from "./pause.png";
// import btnAdd from "./plus.png";



const ActiveWl = ({
  items,
   total, 
   onIncrease, 
   onDecrease, 
   onDelete
}
) => {
  const wl = (item, idx) => {
  const { id, title, count, total, info, allTime } = item;

  return (
     <div className="wl">
    <div className="wl-top wl-pd">
      <span className="wl-top-title">Time tracking</span>
      <div className="btn-more">
        <div className="btn-more-item"></div>
        <div className="btn-more-item"></div>
        <div className="btn-more-item"></div>
      </div>
    </div>
    <div className="wl-cart">

     <span className="wl-cart-title">{title}</span>
      <span className="wl-cart-issue">{info}</span>

      {/* <span className="wl-cart-issue">NEW WORKLOG</span> */}
      <div className="wl-card-timer">{allTime}</div>
      <div className="wl-cart-btns">
        {/* <div className="btn-stop">
          <img src={buttonStop} />
        </div>
        <div className="btn-pause">
          <img src={buttonPause} />
        </div> */}
        <div className="btn-add">{/* <img src={btnAdd} /> */}</div>
      </div>
    </div>
    </div>

  )
  }

  const mapStateToProps = ({ cartItems, orderTotal }) => {
  return {
    total: orderTotal,
    items: cartItems,
  };
};
const mapDispatchToProps = {

    onIncrease:  bookAddedToCart,
    onDecrease: bookRemovedFromCart,
    onDelete:   allBooksRemovedFromCart
    };
 

export default connect(mapStateToProps, mapDispatchToProps)(ActiveWl);


 
 

    {/* <div className="google-cld wl-pd">
      <span className="google-cld-title">Google calendar sync</span>
      {/* <div className="google-cld-icon">
          <img src="./img/icon-top-menu/Vector (4).png" alt="">
        </div> */}
    {/* </div> */}
    {/* <!-- БЛОК С РАСПИСАНИЕМ ВОРКЛОГОВ НА СЕГОДНЯ  --> */}
    {/* <div className="wl-blocks">
      <div className="wl-block">
        <div className="vertic-line"></div>
        <div className="wl-block-main">
          <span className="wl-block-main__title">Logo redesign</span>
          <span className="wl-block-main__timing">09:00 - 10:00</span>
        </div>
      </div>

      <div className="wl-block">
        <div className="vertic-line"></div>
        <div className="wl-block-main">
          <span className="wl-block-main__title">Meeting with SEO</span>
          <span className="wl-block-main__timing">14:00 - 14:45</span>
        </div>
      </div>

      <div className="wl-block">
        <div className="vertic-line"></div>
        <div className="wl-block-main">
          <span className="wl-block-main__title">Brainstorm</span>
          <span className="wl-block-main__timing">15:00 - 15:45</span>
        </div>
      </div>
    </div> */}
    {/* <!-- БЛОК С РАСПИСАНИЕМ ВОРКЛОГОВ НА СЕГОДНЯ  закончился --> */}

