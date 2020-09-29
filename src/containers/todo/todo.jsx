import React, { Component } from "react";
import { connect } from "react-redux";
import ActiveWl from "../../components/active-wl";
// import Header from "../../components/header";
//  import NewWl from "../../components/new-wl";
import {
  addTast,
  // addDubl,
  removeTask,
  completeTask,
  stopTask,
   dublicateTask,

} from "../../actions/actionCreator";

import ToDoInput from "../../components/todo-input/todo-input";
import ToDoList from "../../components/todo-list/todo-list";
import Footer from "../../components/footer/footer";
import "./todo.css";

class ToDo extends Component {

  state = {
    activeFilter: "all",
    taskText: "",
    taskInfo: "",
    taskStatus: true,
    taskTime: "",
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      taskText: value,
      // taskStatus: true,
      // taskTime: 3,
    });
  };
  handleInputChange2 = ({ target: { value } }) => {
    let date = new Date();
    let dateCreateWl =
      //  `${date.getFullYear()}` +
      //  " " +
      //  `${date.getMonth()}` +
      //  " " +
      //  `${date.getDate()}` +
      //  " " +
      `${date.getHours()}` + "-" + "0" + `${date.getMinutes()}`;
    this.setState({
      taskInfo: value,
      taskTime: dateCreateWl,
      // taskStatus: true,
      // taskTime: 3,
    });
  };


  addTast = ({ key }) => {
    const { taskText, taskInfo, taskTime } = this.state;
    if (
      taskText.length > 3 &&
      key === "Enter" &&
      taskInfo.length > 3 &&
      taskTime.length > 0
    ) {
      const { addTast } = this.props;
      addTast(new Date().getTime(), taskText, taskInfo, taskTime, false);
      this.setState({
        taskText: "",
        taskInfo: "",
        taskTime: "",
      });
    }
  };

  render() {
    const { activeFilter, taskText, taskInfo, taskTime } = this.state;
    const { tasks, removeTask, completeTask, dublicateTask } = this.props;
    const isTasksExist = tasks && tasks.length > 0;

    return (
      <div className="todo-wrapper">
        <p> Тут у нас заголловок для формы </p>

        <ToDoInput
          onKeyPress={this.addTast}
          onChange={this.handleInputChange}
          value={taskText}
          placeholder="title"
        />
        <ToDoInput
          onKeyPress={this.addTast}
          onChange={this.handleInputChange2}
          // onClick={this.handleInputChange3}
          value={taskInfo}
          placeholder="issue"
        />

        {/* <ToDoInput
          onKeyPress={this.addTast}
          onChange={this.handleInputChange3}
          value={taskTime}
          placeholder="timeStart"
        /> */}
        {isTasksExist && (
          <div className="content-wrap content-wrap__mg">
            <ToDoList
              // onClick={this.copy}
              completeTask={completeTask}
              stopTask={stopTask}
              tasksList={tasks}
              removeTask={removeTask}
              // onClick={this.addTast}
              dublicateTask={dublicateTask}
            />
            <ActiveWl />
            {/* <NewWl /> */}
          </div>
        )}
        {isTasksExist && (
          <Footer amount={tasks.length} activeFilter={activeFilter} />
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    tasks: state.tasks,
  }),
  { addTast, removeTask, completeTask, stopTask, dublicateTask }
)(ToDo);

//
