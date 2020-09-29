import React from 'react';
import './header.css';
import setting from "./Vector.png";
import info from "./Vector (1).png";
import exit from "./Vector (2).png";
const Header = () => {
  return (
      <div className="header-wrap">
    <header className="top-menu top-menu_mg">
      <div className="top-menu-links">
        <div className="top-menu-links__link" >Home</div>
        <div className="top-menu-links__link" >Issues</div>
        <div className="top-menu-links__link" >Filter</div>
        <div className="top-menu-links__link" >Projects</div>
      </div>
      <div className="top-menu-user">
        <div className="top-menu-user__item"><img src={setting} alt="icon" /></div>
        <div className="top-menu-user__item"><img src={info} alt="icon" /></div>
        <div className="top-menu-user__item accountIn"><img src={exit} alt="icon" /></div>
      </div>
    </header>
  </div>
  )
};

export default Header;