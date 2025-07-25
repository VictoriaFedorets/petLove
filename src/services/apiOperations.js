import axios from "axios";

const instance = axios.create({
  baseURL: "https://petlove.b.goit.study/api",
});

export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common.Authorization;
  }
};

const tokenFromLS = localStorage.getItem("token");
if (tokenFromLS) {
  setAuthToken(tokenFromLS);
}

export default instance;
