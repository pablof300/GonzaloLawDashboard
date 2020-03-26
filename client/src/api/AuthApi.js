import API from "./BaseApi.js";
import Cookies from "js-cookie";

const authenticateUser = async (username, password) => {
  let axiosResponse = await API.post("/auth/login/user", {
    username: username,
    password: password
  })
    .then(async response => {
      Cookies.set("jwt", response.data.token);
      return { token: response.data.token };
    })
    .catch(error => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Invalid user/password!"
      };
    });
  return axiosResponse;
};

const authenticateAdmin = async (username, password) => {
  let axiosResponse = await API.post("/auth/login/admin", {
    username: username,
    password: password
  })
    .then(async response => {
      Cookies.set("jwt", response.data.token);
      return { token: response.data.token };
    })
    .catch(error => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Invalid user/password!"
      };
    });
  return axiosResponse;
};

const verifyUser = async () => {
  let axiosResponse = await API.get("/auth/verify/user", {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` }
  })
    .then(async response => {
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.log(error);
      return false;
    });
  return axiosResponse;
};

const verifyAdmin = async () => {
  let axiosResponse = await API.get("/auth/verify/admin", {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` }
  })
    .then(async response => {
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.log(error);
      return false;
    });
  return axiosResponse;
};

export { authenticateUser, authenticateAdmin, verifyUser, verifyAdmin };
