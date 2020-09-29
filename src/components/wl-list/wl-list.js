import React, { Component } from "react";
import WlListItem from "../wl-list-item";
import { connect } from "react-redux";
import CartTop from "../cart-top";
import AddWl from "../add-wl";
import { withWorklogstoreService } from "../hoc";
import {
  fetchworklogs,
  worklogAddedToCart,
  worklogRemoved,
  worklogCopy,
  getFinish,
  worklogDownload,
  worklogFavorite,
  getStart,
} from "../../actions";
import { compose } from "../../utils";
import buttonAdd from "../../img/plus.svg";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
// import AddWl from "../add-wl";
import "./wl-list.css";

const WlList = ({
  worklogs,
  onAddedToCart,
  onDelete,
  onCopy,
  onDownload,
  onFavorite,
  onFinish,
  onStart,
}) => {
  let date = new Date();

  // нужно получить секунды
  let nowDate = {
    y: date.getFullYear(),
    m: +(date.getMonth() + 1),
    d: date.getDate(),
    h: date.getHours(),
    min: date.getMinutes(),
    s: date.getSeconds(),
    ms: date.getMilliseconds(),
  };
  let second = (nowDate.h * 3600) + (nowDate.m * 60) + nowDate.s;
  let fDay = {};
  function getFinish() {
    let date = new Date();
    // const second = Date.parse("2017.10.11 10:56:20") / 1000;
    // let ad = second * 60 * 60;
    let nowDate = {
      y: date.getFullYear(),
      m: +(date.getMonth() + 1),
      d: date.getDate(),
      h: date.getHours(),
      min: date.getMinutes(),
      s: date.getSeconds(),
      ms: date.getMilliseconds(),
    };
    fDay = nowDate;
    return fDay;
  }
  // function getS() {
  //   return 23;
  // }
  return (
    <div className="cart-day">
      {/* <button onClick={() => go()}>ДОБАВИТЬ </button> */}

      <div className="cart">
        <div className="cart-content">
          {worklogs.map((worklog) => {
            if (worklog.startedAt > 0 && worklog.isStarting !== true) {
              getFinish(); // тут объект с финиш датой, ее надо преобразовать в секунды и отправить в экшн
              onFinish(worklog.id, second);
               console.log(second, " finish ");
              return (
                <WlListItem
                  key={worklog.id}
                  id={worklog.id}
                  worklog={worklog}
                  onAddedToCart={() => onAddedToCart(worklog.id)}
                  onDelete={() => onDelete(worklog.id)}
                  onCopy={() => onCopy(worklog.id, nowDate)}
                  // onFinish={() => onFinish(worklog.id, fDay)}
                  onDownload={() => onDownload(worklog.id)}
                  onFavorite={() => onFavorite(worklog.id)}
                />
              );
            }
            if (worklog.timeStart === "") {
              // getS();
              // onStart={onStart}

              // console.log( " start in wl  ");
              return (
                <WlListItem
                  key={worklog.id}
                  id={worklog.id}
                  worklog={worklog}
                  onAddedToCart={() => onAddedToCart(worklog.id)}
                  onDelete={() => onDelete(worklog.id)}
                  onCopy={() => onCopy(worklog.id, nowDate)}
                  onStart={() => onStart(worklog.id, nowDate)}
                  // onFinish={() => onFinish(worklog.id, fDay)}
                  onDownload={() => onDownload(worklog.id)}
                  onFavorite={() => onFavorite(worklog.id)}
                />
              );
            }

            return (
              <WlListItem
                key={worklog.id}
                id={worklog.id}
                worklog={worklog}
                onAddedToCart={() => onAddedToCart(worklog.id)}
                onDelete={() => onDelete(worklog.id)}
                onCopy={() => onCopy(worklog.id, nowDate)}
                onDownload={() => onDownload(worklog.id)}
                onFavorite={() => onFavorite(worklog.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

class WlListContainer extends Component {
  componentDidMount() {
    // здесь наши пропсы перетекают в один сплошной пропс дабы не маячить в коде
    this.props.fetchworklogs();
  }

  render() {
    const {
      worklogs,
      loading,
      error,
      modalIsOpen,
      onAddedToCart,
      onDelete,
      onCopy,
      onStart,
      onFinish,
      // nowDate,
      onDownload,
      onFavorite,

      showFavoriteList,
      // showModal,
      favorites,
    } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }
    if (modalIsOpen) {
      return (
        <div>
          <CartTop />
          <WlList worklogs={worklogs} />
          <AddWl />
        </div>
      );
    }

    if (showFavoriteList) {
      if (favorites.length < 1) {
        return (
          <div>
            <div className="empty">There is no favorite issues yet</div>
            <div className="">
              <div className="add">
                <img
                  src={buttonAdd}
                  alt="icon"
                  // onClick={onShowModal}
                />
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            {/* <CartTop /> */}
            <WlList worklogs={favorites} />
          </div>
        );
      }
    }
    return (
      <div>
        <CartTop />
        <WlList
          worklogs={worklogs}
          onAddedToCart={onAddedToCart}
          onDelete={onDelete}
          onCopy={onCopy}
          onFinish={onFinish}
          onDownload={onDownload}
          onFavorite={onFavorite}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  worklogs,
  seconds,
  loading,
  error,
  showFavoriteList,
  favorites,
  modalIsOpen,
}) => {
  return {
    worklogs,
    seconds,
    loading,
    error,
    modalIsOpen,
    showFavoriteList,
    favorites,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { worklogstoreService } = ownProps;
  return {
    fetchworklogs: fetchworklogs(worklogstoreService, dispatch),
    onAddedToCart: (id) => dispatch(worklogAddedToCart(id)),
    onDelete: (id) => dispatch(worklogRemoved(id)),
    onCopy: (id, worklogDate) => dispatch(worklogCopy(id, worklogDate)),
    onFinish: (id, finishTime) => dispatch(getFinish(id, finishTime)),
    onStart: (id, startTime) => dispatch(getStart(id, startTime )),
    onDownload: (id) => dispatch(worklogDownload(id)),
    onFavorite: (id) => dispatch(worklogFavorite(id)),
  };
};

export default compose(
  withWorklogstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(WlListContainer);
