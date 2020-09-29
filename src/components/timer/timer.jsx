import React from "react";
// import { Component } from "react";
// import PropTypes from 'prop-types';
import "./timer.css";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      startDisabled: true,
      stopDisabled: false,
      minute: "00",
      hour: "00",
      sec: "00",
    };
  }
  stop = () => {
    clearInterval(this.state.timer);
  };
  reset = () => {
    this.setState({
      timer: null,
      counter: "00",
      sec: "00",
      hour: "00",
      minute: "00",
      startDisabled: true,
      stopDisabled: false,
    });
  };
  start = () => {
    var self = this;
    let timer = setInterval(() => {
      let sec = (Number(this.state.sec) + 1).toString();
      let minute = this.state.minute;
      let hour = this.state.hour;

      if (Number(this.state.sec) === 59) {
        minute = (Number(this.state.minute) + 1).toString();
        sec = "00";
      }
      if(Number(this.state.minute) === 59) {
        hour = ( Number(this.state.hour) + 1).toString();
        minute= "00";
      }

      self.setState({
        minute: minute.length === 1 ? "0" + minute : minute,
        sec: sec.length === 1 ? "0" + sec : sec,
        hour: hour.length === 1 ? "0" + hour : hour,
      });
    }, 10);
    this.setState({ timer });
  };

  render() {
    return (
      <div>
        <div className="stopwatch">
          {/* ТУТ НУЖНО СДЕЛАТЬ ФОРМАТИРОВАНИЕ ВРЕМЕНИ */}
          <span> {this.state.hour}</span>
          <span>{this.state.minute}</span>
          {/* <span> {this.state.sec}</span> */}
        </div>
        {/* <button onClick={this.stop}>стоп </button>
        <button onClick={this.reset}>сброс </button> */}
        <button onClick={this.start}>start </button>
      </div>
    );
  }
  // componentDidMount() {}
}

export default Timer;
