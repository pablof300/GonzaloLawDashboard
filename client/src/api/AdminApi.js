import API from "./BaseApi.js";
import Cookies from "js-cookie";

const getEvents = async () => {
    console.log("Doing this?")
    let axiosResponse = await API.get("/admin/events", {
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
                error: "Unable to retrieve events!"
            };
        });
    return axiosResponse;
};

const getCurrentAdmin = async () => {
    let axiosResponse = await API.get("/admin/", {
      headers: { Authorization: `Bearer ${Cookies.get("jwt")}` }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error !== null && error.response) {
          return { error: error.response };
        }
        return {
          error: "Unable to retrieve user!"
        };
      });
  
    return axiosResponse;
  };

const getClients = async (clientId) => {
    const admin = (await getCurrentAdmin()).data;
    let axiosResponse = await API.get("/admin/client", {
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
                error: "Unable to retrieve events!"
            };
        });
    return axiosResponse;
};

export { getEvents, getClients, getCurrentAdmin };
