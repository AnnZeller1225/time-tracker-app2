const worklogsLoaded = (newworklogs) => {
  return {
    type: "FETCH_WORKLOGS_SUCCESS",
    payload: newworklogs,
  };
};
const worklogsRequested = () => {
  return {
    type: "FETCH_WORKLOGS_REQUEST",
  };
};

const worklogsError = (error) => {
  return {
    type: "FETCH_WORKLOGS_FAILURE",
    payload: error,
  };
};

export const worklogAddedToCart = (worklogId) => {
  return {
    type: "WORKLOG_ADDED_TO_CART",
    payload: worklogId,
  };
};

export const worklogRemovedFromCart = (worklogId) => {
  return {
    type: "WORKLOG",
    payload: worklogId,
  };
};
export const allworklogsRemovedFromCart = (worklogId) => {
  return {
    type: "ALL_WORKLOGS_REMOVED_FROM_CART",
    payload: worklogId,
  };
};
export const worklogRemoved = (worklogId) => {
  return {
    type: "WORKLOG_REMOVED",
    payload: worklogId,
  };
};
export const worklogCopy = (worklogId, worklogDate) => {
  return {
    type: "WORKLOG_COPY",
    payload: worklogId,
    nowDate: worklogDate,
  };
};
export const getFinish = (worklogId, finishTime) => {
  return {
    type: "GET_FINISH_TIME",
    payload: worklogId,
    finishTime,
  };
};
export const getStart = (worklogId, startTime) => {
  return {
    type: "GET_START_TIME",
    payload: worklogId,
    startTime,
  };
};
export const addNewWorklog = (name, title, planingTime, second, sec, data) => {
  return {
    type: "ADD_NEW_WL",
    name,
    title,
    planingTime,
    second,
    sec,
    data,
  };
};

export const worklogDownload = (worklogId) => {
  return {
    type: "WORKLOG_DOWNLOAD",
    payload: worklogId,
  };
};

export const worklogFavorite = (worklogId) => {
  return {
    type: "WORKLOG_FAVORITE",
    payload: worklogId,
  };
};
export const showFavoritesWorklogs = () => {
  return {
    type: "SHOW_FAVORITE",
  };
};
export const showModal = () => {
  return {
    type: "SHOW_MODAL",
  };
};

export const stopWorklog = (worklogId) => {
  return {
    type: "STOP_WORKLOG",
    payload: worklogId,
  };
};


export const startTimer = (sec) => {
  return {
    type: "START_TIMER",
    sec,
  };
};

function fetchworklogs(worklogstoreService, dispatch) {
  // будет полезно при подгрузке ворклогов с стороннего источника
  return () => {
    dispatch(worklogsRequested());
    worklogstoreService
      .getWorklogs()
      .then((data) => dispatch(worklogsLoaded(data)))
      .catch((err) => dispatch(worklogsError(err)));
  };
}

export { fetchworklogs };
