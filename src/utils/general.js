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
