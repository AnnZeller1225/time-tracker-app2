const initialState = {
  worklogs: [
    {
      id: 1,
      title: "Team standup",
      info: "JRM_320",
      timeStart: "38520",
      timeStop: "45240",
      isLoad: false,
      isStarting: false,
      allTime: "3.00",
    },
    {
      id: 2,
      title: "Meeting with QA",
      info: "JRM_320",
      timeStart: "38520",
      timeStop: "40431",
      isLoad: false,
      isStarting: false,
      allTime: "1.30",
    },
    {
      id: 3,
      title: "Company branding",
      info: "JRM_320",
      timeStart: "51840",
      timeStop: "53840",
      isLoad: false,
      isStarting: false,
      allTime: "2.40",
    },
  ],
  loading: false,
  error: null,
  modalIsOpen: false,
  activeWorklogs: [], // то, что отображается справа, активный ворклог
  favorites: [
  ],
  showFavoriteList: false,
  seconds: 0, // для таймера, пока не актуально, в разработке 
};
let id = 4; // ид для добавления новых ворклогов, точка отсчета
const updateCartItems = (arr, item, idx) => {
  if (item.count === 0) {
    return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
  }
  if (idx === -1) {
    return [...arr, item];
  } else {
    return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
  }
};
const deleteItem = (cartItems, item = {}, idx) => {
  return [...cartItems.slice(0, idx), ...cartItems.slice(idx + 1)]; // тут мы удаляем массив
};
let updateNewWorklog = (worklog, item = {}, startedAt) => {
  const {
    id = worklog.id,
    info = worklog.info,
    title = worklog.title,
    timeStart = worklog.timeStart,
    timeStop = worklog.timeStop,
    allTime = worklog.allTime,
    timeNow = worklog.sec,
    isStarting = true,
    // started = startedAt,
  } = item;
  return {
    id,
    title,
    info,
    timeStart,
    timeStop,
    allTime,
    timeNow,
    isStarting,
  };
};

const updateOrder = (state, worklogId) => {
  
  const { worklogs, activeWorklogs } = state;
  const worklog= worklogs.find(({ id }) => id === worklogId);
  const itemIndex = activeWorklogs.findIndex(({ id }) => id === worklogId);
  const item = activeWorklogs[itemIndex];
  const newItem = updateNewWorklog(worklog, item);
  return {
    ...state,
    activeWorklogs: updateCartItems(activeWorklogs, newItem, itemIndex),
  };
};

const updateOrderWL = (state, worklogId) => {
  const { worklogs, activeWorklogs } = state;
  const worklog = worklogs.find(({ id }) => id === worklogId);
  const itemIndex = activeWorklogs[0];
  const item = activeWorklogs[itemIndex];
  const newItem = updateNewWorklog(worklog, item); // нашли один объект элемента
  // console.log(newItem, " новый элемент "); // отображается в правом блоке, попдалая в массив activeWL

  return {
    ...state,
    activeWorklogs: newItem,
  };
};

const updateWorklog = (state, worklogId) => {
  const { worklogs } = state;
  const worklog= worklogs.find(({ id }) => id === worklogId);
  const itemIndex = worklogs.findIndex(({ id }) => id === worklogId);
  const item = worklogs[itemIndex];
  const newItem = updateNewWorklog(worklog, item);

  return {
    ...state,
    worklogs: deleteItem(worklogs, newItem, itemIndex),
  };
};
const updateCopyWorklogs = (state, worklogId, nowDate) => {
  const { worklogs } = state;
  const worklog = worklogs.find(({ id }) => id === worklogId);
  const itemIndex = worklogs.findIndex(({ id }) => id === worklogId);
  const item = worklogs[itemIndex];
  let seconds = nowDate.h * 60 * 60 + nowDate.min * 60;
  const newItem = updateNewWorklog(worklog, item); // тут объект
  newItem.id = id++;
  newItem.data = nowDate;
  newItem.isStarting = true;
  newItem.timeStart = seconds;
  newItem.timeStop = nowDate.h + "-" + nowDate.min; // тут число гетдэй
  newItem.startedAt = seconds;
  return {
    ...state,
    worklogs: updateArr(worklogs, newItem, itemIndex),
  };
};

const worklogsDownload = (state, worklogId) => {
  const { worklogs } = state;
  const itemIndex = worklogs.findIndex(({ id }) => id === worklogId);
  const item = worklogs[itemIndex];
  return {
    ...state,
    worklogs: worklogs.map((worklog) => {
      if (worklog.id === item.id) {
        worklog.isLoad = true;
      }
      return worklog;
    }),
  };
};
const updateArr = (arr, item) => {
  return [...arr, item];
};

const addToFavorite = (state, worklogId) => {
  const { worklogs, favorites } = state;
  const itemIndex = worklogs.findIndex(({ id }) => id === worklogId);
  const item = worklogs[itemIndex];
  const newItem = updateNewWorklog(favorites, item);
  return {
    ...state,
    favorites: updateArr(favorites, newItem, itemIndex),
  };
};
const updateTimer = (state, sec) => {
  // console.log(" работает ", sec);
  // const { seconds } = state;
  return {
    ...state,
    // seconds: sec, // сжда перегести по номеру id allTime
  };
};

const getAdd = (state, name, title, planingTime, second, sec) => {
  id++;
// console.log(planingTime, "наш timestart");
let newPlaningTime = planingTime.split(".");
let s = newPlaningTime[0] * 3600;
let s2 = newPlaningTime[1] * 60;
let n = s + s2;
// console.log(n);
  const { worklogs } = state;
  const item = {
    id: id,
    info: name,
    title: title,
    allTime: n,
    timeStart: second,
    timeNow: sec,
    // timeStop: timeStart + allTime
  };
  if (item.title !== "") {
    return {
      ...state,
      worklogs: updateArr(worklogs, item),
      activeWorklogs: [],
    };
  } else {
    return {
      ...state,
    };
  }
};
const showFavorites = (state) => {
  const { favorites, showFavoriteList } = state;
  return {
    ...state,
    showFavoriteList: !showFavoriteList,
    favorites: favorites.map((item) => {
      return item;
    }),
  };
};
const showModal = (state) => {
  const { modalIsOpen } = state;
  return {
    ...state,
    modalIsOpen: !modalIsOpen,
  };
};

// const a = (obj) => {
//   return (obj.isStarting = false); // идею изменить
// };
const stopWorklog = (state) => {
  const { worklogs, activeWorklogs, modalIsOpen } = state;
  let index = activeWorklogs.id + 1;
   let newItem = worklogs.find((worklog) => worklog.id === index);

  // newItem.isStarting = false;

  return {
    ...state,
    // worklogs: updateCartItems(worklogs, newItem, activeWorklogs.id),
    // activeWorklogs: a(activeWorklogs),
    // modalIsOpen: !modalIsOpen,
  };
};
const getFinishedTime = (state, worklogId, finishTime) => {
  const { worklogs } = state;
  // console.log(" прилетел getFinishedTime ", finishTime);
  let newItem = worklogs.find((worklog) => worklog.id === worklogId);
  newItem.timeStop = finishTime;
  // newItem.timeStop = finishTime.h + " " + finishTime.min
  // console.log(newItem, " newB ");
  // newItem.timeStop = "2323";
  // newItem.timeStop = finishTime.h, finishTime.min;
  return {
    ...state,
      // "{  worklogs: updateCopyItem(worklogs, newItem),
  };
};
const getStartedTime = (state) => {
  const { worklogs } = state;
  // console.log(" долетел getStartedTime");
  return {
    ...state,
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "WORKLOG_ADDED_TO_CART": // здесь идет отображение в ceuuent wl // работает клорректно
      return updateOrderWL(state, action.payload);

    case "WORKLOGS_REMOVED_FROM_CART":
      return updateOrder(state, action.payload, -1);

    // это нам не надо пока
    case "ALL_WORKLOGS_REMOVED_FROM_CART": // удалить все из избранных 
      const item = state.cartItems.find(({ id }) => id === action.payload);
      return updateOrder(state, action.payload, -item.count);

    case "WORKLOG_REMOVED":
      return updateWorklog(state, action.payload, -1);

    case "WORKLOG_COPY":
      // тут заменим на новую функцию, где сбросим время нового копируемого wl
      return updateCopyWorklogs(state, action.payload, action.nowDate);
    // case "STOP"

    case "WORKLOG_DOWNLOAD": // не работает
      return worklogsDownload(state, action.payload);

    case "ADD_NEW_WL":
      return getAdd(
        state,
        action.name,
        action.title,
        action.planingTime,
        action.second,
        action.sec,
        action.data
      );
    case "WORKLOG_FAVORITE":
      return addToFavorite(state, action.payload); 
    case "SHOW_FAVORITE":
      return showFavorites(state); // отрисовка избранных
    case "SHOW_MODAL":
      return showModal(state);
    case "STOP_WORKLOG":
      return stopWorklog(state);

    case "GET_FINISH_TIME":
      return getFinishedTime(state, action.payload, action.finishTime);
    case "GET_START_TIME":
      return getStartedTime(state, action.payload, action.startTime);

    case "START_TIMER":
      return updateTimer(state, action.sec);
    default:
      return state;
  }
};
export default reducer;
