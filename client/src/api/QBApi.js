import API from "./BaseApi.js";
import Cookies from "js-cookie";

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
  console.log("heh");
  console.log(axiosResponse);
  return axiosResponse;
};

export { getURL };
