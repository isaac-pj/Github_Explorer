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

export const handlePagination = ({ link }) => {
  if (link) {
    link = link
      .split(",")
      .map((rel) => {
        const [url, pos] = rel.split(";");
        return {
          [pos.match(/(next)|(prev)|(last)|(first)/)[0]]: {
            url: url.match(/(?<=\<)(.*?)(?=\>)/)[0],
            page: url.match(/(?<=page=)(\d+)/)[0],
          },
        };
      })
      .reduce((pv, cv) => ({ ...pv, ...cv }));
    return link;
  }
};
