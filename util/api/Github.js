import axios from "axios";

const baseUrl = "https://api.github.com";

const searchUser = async (username, page, totalUser) => {
  const res = await axios.get(`${baseUrl}/search/users`, {
    params: {
      q: username,
      in: "login",
      type: "user",
      page,
      per_page: totalUser,
    },
  });
  return res.data;
};

const detailUser = async (username) => {
  const res = await axios.get(`${baseUrl}/users/${username}`);
  return res.data;
};

const getRepo = async (username, page, totalPage) => {
  const res = await axios.get(`${baseUrl}/users/${username}/repos`, {
    params: {
      page,
      per_page: totalPage,
    },
  });
  return res.data;
};

export { searchUser, detailUser, getRepo };
