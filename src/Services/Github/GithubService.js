import axios from "axios";

// const client_id = "Iv1.ca6c3c58ccdfa06b";
// const client_secret = "eaaf222d5c4d064b634159bfdf9398cb42d35519";

const api = axios.create({
  baseURL: "https://api.github.com",
  params: {
    client_id: "Iv1.ca6c3c58ccdfa06b",
    client_secret: "eaaf222d5c4d064b634159bfdf9398cb42d35519",
  },
});

export const searchUser = async (string) => {
  const response = await api.get(
    `/search/users?q=${string}&page=0&per_page=15`
  );
  return response.data;
};

export const request = async (url) => {
  const response = await axios.get(
    `${url}?client_id=${api.params.client_id}&client_secret=${api.params.client_secret}`
  );
  return response.data;
};
