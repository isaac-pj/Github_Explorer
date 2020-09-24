import moment from "moment";

export const noBubble = (event, callback) => {
  event.preventDefault();
  event.stopPropagation();
  callback && callback(event);
};

export const debounce = (time, callback) => {
  let timer = null;
  clearTimeout(timer);
  timer = setTimeout(callback, time);
  return timer;
};

export const updateHistory = (value) => {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const item = { search: value, date: moment() };

  if (history?.length < 5) {
    history.unshift(item);
  } else {
    history.pop();
    history.unshift(item);
  }

  localStorage.setItem("history", JSON.stringify(history));
};
