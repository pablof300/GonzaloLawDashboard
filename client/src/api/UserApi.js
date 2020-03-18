import API from "./BaseApi.js";
import Cookies from "js-cookie";

const getCurrentUser = async () => {
  let axiosResponse = await API.get("/user/:id", {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` }
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to retrieve user!"
      };
    });

  return axiosResponse;
};

const updateUserData = async (data) => {
    let axiosResponse = await API.put("/user/:id", data, {
      headers: { Authorization: `Bearer ${Cookies.get("jwt")}` }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error.response) {
          return { error: error.response.data.error };
        }
        return {
          error: "Unable to update user information!"
        };
      });
  
    return axiosResponse;
  };

export { getCurrentUser, updateUserData };
