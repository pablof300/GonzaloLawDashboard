import API from "./BaseApi.js";
import Cookies from "js-cookie";


const getClients = async () => {
  let axiosResponse = await API.get("/admin/clients", {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` }
  })
    .then(response => {
      return response.data.data;
    })
    .catch(error => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to get clients!"
      };
    });
  return axiosResponse;
};

const deleteClient = async (clientId) => {
  let axiosResponse = await API.put("/admin/remove/" + clientId, clientId, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` }
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      return {
        error: "Unable to delete client!"
      };
    });
  return axiosResponse;
};

const addClient = async (clientId) => {
  let axiosResponse = await API.put("/admin/add/" + clientId, clientId, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` }
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      return {
        error: "Unable to delete client!"
      };
    });
  return axiosResponse;
};


export { getClients, deleteClient, addClient };
