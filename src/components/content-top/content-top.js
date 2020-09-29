import React from "react";
import "./content-top.css";
import { connect} from "react-redux";

import * as actions from "../../actions";
import { bindActionCreators } from "redux";
// import { showFavoritesWorklogs } from "../../actions";

const ContentTop = ({showFavoritesWorklogs }) => {


 let date = new Date();
var month = Number(date.getMonth() + 1);
var arr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let day = date.getDate() + " " + (arr[month - 1] + " " + date.getFullYear());

//   let day =  + month();

  return (
    <div className="content-top content-top__mg">
      <div className="data-today">
        <span className="data-today__item">{day}</span>
      </div>
      {/* <div className="data-today">
        <span className="data-today__item">}</span>
      </div> */}

      <div className="filter">
        <div
          className="filter-item filter-item__all"
          onClick={showFavoritesWorklogs}
        >
          All
        </div>
        <div
          className="filter-item filter-item__fav"
          onClick={showFavoritesWorklogs}
          // style={
          //   showFavoritesWorklogs.isActive
          //     ? styles.isActive
          //     : styles.default
          // }
        >
          Favorites
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showFavoriteList: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  const { showFavoritesWorklogs } = bindActionCreators(actions, dispatch);
  return {
    showFavoritesWorklogs,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContentTop);



