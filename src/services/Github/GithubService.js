import axios from "axios";

const client_id = "Iv1.ca6c3c58ccdfa06b";
const client_secret = "eaaf222d5c4d064b634159bfdf9398cb42d35519";
const personal_token = "ba12995bf799f95689a902e9adb8b9dbcbb21bbd";

const api = axios.create({
  baseURL: "https://api.github.com",
  params: {},
  headers: { Authorization: `Bearer ${personal_token}` },
});

const config = {
  headers: { Authorization: `Bearer ${personal_token}` },
};

export const searchUser = async (string) => {
  const response = await api.get(
    `/search/users?q=${string}&page=0&per_page=10`
  );
  return response.data;
};

export const getUser = async (username) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

export const getRepos = async (user, sort = "created", direction = "desc") => {
  const response = await api.get(
    `/users/${user}/repos?per_page=10&sort=${sort}&direction=${direction}`
  );
  return response.data;
};

// export const getRanking = async (language, since) => {
//   const response = await axios.get(
//     `https://ghapi.huchen.dev/developers?language=${language}&since=${since}`
//   );

//   return response.data;
// };

export const getRanking = async () => {
  const response = await axios.get(`https://ghapi.huchen.dev/developers`);
  const data = await Promise.all(
    response.data.map((user) => getUser(user.username))
  );
  return data.slice(0, 5);
};

export const request = async (url) => {
  const response = await axios.get(`${url}`, config);
  return response.data;
};
