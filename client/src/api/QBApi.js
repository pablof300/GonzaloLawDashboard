import API from "./BaseApi.js";
import Cookies from "js-cookie";

const checkURLStatus = async () => {
  let axiosResponse = await API.get("/payments/status")
    .then(response => {
      console.log(response.data);
      return response.data.data;
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

const createAnInvoice = async (customerName, description, amount) => {
  let invoiceData = {customerName: customerName, description: description, amount: amount};
  let axiosResponse = await API.post("/payments/invoice", invoiceData)
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(error => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to create the invoice."
      };
    });

  return axiosResponse;
};

const getAllInvoices = async (customerName) => {
  let axiosResponse = await API.get(`/payments/invoices/?customerName=${customerName}`)
    .then(response => {
      console.log(response);
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

const getInvoicePdf = async (invoiceId) => {
  let axiosResponse = await API.get(`/payments/invoice/pdf?invoiceId=${invoiceId}`,
    {headers: {
      "Content-Type": "application/octet-stream"},
      responseType: "arraybuffer"})
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to get the invoice PDF."
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

export { checkURLStatus, createAnInvoice, getURL, getAllInvoices, getInvoicePdf };
