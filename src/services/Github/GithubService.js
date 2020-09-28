import axios from "axios";
import { handlePagination } from "../../utils/general";

const token = localStorage.getItem("personal_token");
const personal_token = !token
  ? localStorage.setItem("personal_token", "")
  : token;

const api = axios.create({
  baseURL: "https://api.github.com",
  params: {},
  headers: {
    Authorization: personal_token ? `Bearer ${personal_token}` : null,
  },
});

const config = {
  headers: {
    Authorization: personal_token ? `Bearer ${personal_token}` : null,
  },
};

export const getAuthUser = async () => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const searchUser = async (string, page = 0) => {
  try {
    const response = await api.get(
      `/search/users?q=${string}&page=${page}&per_page=10`
    );

    return await parseSearch(response);
  } catch ({ response: { data } }) {
    return data;
  }
};

export const getUser = async (username) => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch ({ response: { data } }) {
    return data;
  }
};

export const getRepos = async (user, sort = "created", direction = "desc") => {
  const response = await api.get(
    `/users/${user}/repos?per_page=10&sort=${sort}&direction=${direction}`
  );
  return response.data;
};

export const getRankingDevs = async (language, since) => {
  const response = await axios.get(
    `https://ghapi.huchen.dev/developers?language=${language}&since=${since}`
  );
  const data = await Promise.all(
    response.data.map((user) => getUser(user.username))
  );
  return data.slice(0, 5);
};

const parseRepoData = (repo) => {
  return {
    ...repo,
    html_url: repo.url,
    forks_count: repo.forks,
    stargazers_count: repo.stars,
  };
};

export const getRankingRepos = async (language, since) => {
  const response = await axios.get(
    `https://ghapi.huchen.dev/repositories?language=${language}&since=${since}`
  );

  const data = response.data.map((repo) => parseRepoData(repo));

  return data.slice(0, 5);
};

export const request = async (url, full) => {
  const response = await axios.get(`${url}`, config);
  return full ? response : response.data;
};

export const parseSearch = async (response) => {
  const { data, headers } = response;
  return {
    users: await getUsers(data.items),
    pagination: handlePagination(headers),
    total_count: data.total_count,
  };
};

export const getUsers = async (arr) => {
  return await Promise.all(
    arr.map((user) => {
      return request(user.url);
    })
  );
};
