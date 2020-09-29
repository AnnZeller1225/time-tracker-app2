import {
  ADD_TASK,
  REMOVE_TASK,
  COMPLETE_TASK,
  STOP_TASK,
  DUBLICATE_TASK,
} from "../constants";

const TASKS = {
  data: [
    {
      id: 1,
      title: "Have a meet",
      info: "JRM_320",
      timeStart: "02-30",
      timeStop: "02-50",
      isLoad: false,
      isStart: true,
      isStop: false,
      isCompleted: true,
      // stopTask: false,
    },
    {
      id: 2,
      title: "have a work",
      info: "JRM_320",
      timeStart: "02-30",
      timeStop: "02-50",
      isLoad: false,
      isStart: true,
      isStop: false,

      isCompleted: true,

      // stopTask: false,
    },
    {
      id: 3,
      title: "Learn GitHub",
      info: "JRM_320",
      timeStart: "02-30",
      timeStop: "02-50",
      isLoad: false,
      isStart: true,
      isStop: false,
      isCompleted: true,
    },
  ],
};

const tasks = (state = TASKS.data, { id, title, info, timeStart, type }) => {
  switch (type) {
    case ADD_TASK:
      return [
        ...state,
        {
          id,
          title,
          info,
          timeStart,
          // timeStop,
          // timeStart,
          // isLoad,
          // isCompleted,
          // isStart,
          // type,
          // isStop,
        },
      ];
    case DUBLICATE_TASK:
      return [
        ...state,
        {
          id,
          title,
          info,
          timeStart,
        },
      ];

    case REMOVE_TASK:
      return [...state].filter((task) => task.id !== id);
    case COMPLETE_TASK:
      return [...state].map((task) => {
        if (task.id === id) {
          task.isCompleted = !task.isCompleted;
        }
        return task;
      });
    case STOP_TASK:
      return [...state].map((task) => {
        if (task.id === id) {
          task.stopTask = !task.stopTask;
        }
        return task;
      });
    default:
      return state;
  }
};

export default tasks;
