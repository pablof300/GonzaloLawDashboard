import API from "./BaseApi.js";
import Cookies from "js-cookie";

const checkURLStatus = async () => {
  let axiosResponse = await API.get("/payments/status")
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to get OAuthURL status."
      };
    });

  return axiosResponse;
}

const getAllInvoices = async (customerName) => {
  let axiosResponse = await API.get(`/payments/invoices/?customerName=${customerName}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to get your invoices."
      };
    });

  return axiosResponse;
};

const getURL = async () => {
  let axiosResponse = await API.get("/payments/oauth")
    .then(response => {
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

export { checkURLStatus, getURL, getAllInvoices };
