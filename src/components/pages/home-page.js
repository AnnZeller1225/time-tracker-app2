import React from "react";
import WlList from "../wl-list";
import Header from "../header";
// import CartTop from "../cart-top";
//  import CartContainer from '../cart-container';
//  import ActiveWl from '../active-wl';

import ContentTop from "../content-top";
import "./home-page.css";
// import AddWl from "../add-wl";
import CurrentWl from "../current-wl";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="content-wrap content-wrap__mg">
        <div className="main-content">
          <ContentTop />

          <WlList />
          {/* <NewWl /> */}
        </div>
        <CurrentWl />
      </div>
      {/* <AddWl /> */}
    </div>
  );
};

export default HomePage;
