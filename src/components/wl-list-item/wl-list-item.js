import React from "react";
import { useState } from "react";
import "./wl-list-item.css";
// import buttonDownload from "../../img/direct-download 1.png";

import buttonPlay from "../../img/play.svg";

const WlListItem = ({
  worklog,
  onAddedToCart,
  onDelete,
  onCopy,
  onDownload,
  onFavorite,
  onFinish,
}) => {
  const {
    title,
    info,
    timeStart,
    timeStop,
    // allTime,
    timeNow,
    // isStarting,
    // startedAt,
    // planingTime,
  } = worklog;
  const [listHide, setListHide] = useState(true); // фскрываем список
  const [btnMoreHide, setBtnMoreHide] = useState(true);

  const styles = {
    isLoad: {
      backgroundColor: "red",
      border: "1px solid black",
    },
    default: {
      backgroundColor: "white",
      border: "1px solid black",
    },
    isHide: {
      display: "none",
    },
    defaultForList: {
      display: "flex",
    },
  };
  function timeConvert(time) {
    let h = Math.floor(time / 60 / 60);
    let m = Math.floor(time / 60) - h * 60;
    let s = Math.floor(time / 60) - m * 60;
    let newTime = h + ":" + m;
    return newTime;
  }
  let start = timeConvert(timeStart);
  // console.log(timeStart, " мы в элементе ");
  let stop = timeConvert(timeStop);
   let all;
  all = timeConvert(Number(timeStop) - Number(timeStart)); 

  




  return (
    <div
      className="cart-block-wp2"
      onMouseEnter={() => setBtnMoreHide(false)}
      onMouseLeave={() => setBtnMoreHide(true)}
    >
      <div
        className="more-vertical"
        style={btnMoreHide ? styles.isHide : styles.defaultForList}
        onMouseEnter={() => setListHide(false)}
        onMouseLeave={() => setListHide(true)}
      >
        <div className="more-vertical__circle"></div>
        <div className="more-vertical__circle"></div>
      </div>
      <div
        className="more-list "
        onMouseEnter={() => setListHide(false)}
        onMouseLeave={() => setListHide(true)}
        style={listHide ? styles.isHide : styles.defaultForList}
      >
        <span className="more-list__item">Jira link</span>
        <span className="more-list__item" onClick={onCopy}>
          Dublicate
        </span>
        {/* */}
        <span className="more-list__item" onClick={onDownload}>
          Download
        </span>
        <span className="more-list__item" onClick={onFavorite}>
          Add to favorite
        </span>
        <span className="more-list__item" onClick={onDelete}>
          Delete
        </span>
      </div>
      <div className="cart-block">
        <div className="cart-timing">
          <div className="cart-timing-wrap">
            <span className="cart-timing-wrap--bold">{start}</span>
          </div>
          <span>{stop}</span>
          <div
            className="vertic-line"
            style={worklog.isLoad ? styles.isLoad : styles.default}
          ></div>
        </div>
        <div className="cart-main">
          <div className="cart-info">{info}</div>
          <div className="cart-info"> {timeNow}</div>
          <div className="cart-title">{title}</div>
        </div>
        <div className="cart-time-info">{all}</div>
        {/* тут сделать вычисления из секунд */}
        <div onClick={onCopy} className="cart-icon">
          <img
            className="cart-icon--pause"
            src={buttonPlay}
            alt="icon"
            onClick={onAddedToCart}  // отобразить в правом блоке
          />
          {/* <!-- <img className="hide" src="./img/icon-top-menu/stop (3).png"> --> */}
        </div>
      </div>
    </div>
  );
};
export default WlListItem;
