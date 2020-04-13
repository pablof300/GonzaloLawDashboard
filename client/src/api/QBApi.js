import API from "./BaseApi.js";
import Cookies from "js-cookie";

const checkURLStatus = async () => {
  let axiosResponse = await API.get("/payments/status")
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(error => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to get OAuthURL"
      };
    });
    
  return axiosResponse;
}

const getURL = async () => {
  let axiosResponse = await API.get("/payments/oauth")
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(error => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to get OAuthURL"
      };
    });

  return axiosResponse;
};

export { getURL, checkURLStatus };
