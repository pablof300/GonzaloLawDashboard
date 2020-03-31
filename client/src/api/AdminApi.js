import API from "./BaseApi.js";
import Cookies from "js-cookie";

const getAllClients = async () => {
  let axiosResponse = await API.get("/admin/clients", {
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
        error: "Unable to retrieve clients!"
      };
    });
  return axiosResponse;
};

const getEvents = async () => {
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

const addEvent = async (title, type, startDate, duration, notes, clientId) => {
  let axiosResponse = await API.post(
    "/admin/events",
    {},
    {
      params: {
        title: title,
        type: type,
        startDate: startDate,
        duration: duration,
        clientId: clientId,
        notes: notes
      },
      headers: { Authorization: `Bearer ${Cookies.get("jwt")}` }
    }
  )
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

export { getEvents, getAllClients, addEvent };
