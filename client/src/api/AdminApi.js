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

const getCaseById = async (id) => {
  let axiosResponse = await API.get(`/case/${id}`, {
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
        error: "Unable to retrieve case!"
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

const addClient = async (
  username,
  password,
  firstName,
  middleName,
  secondName,
  otherName,
  street,
  city,
  state,
  zip,
  homePhone,
  workPhone,
  cellPhone,
  email,
  birthDate
) => {
  let userData = {
    username: username,
    password: password,
    firstName: firstName,
    secondName: secondName,
    middleName: middleName,
    otherName: otherName,
    address: {
      street: street,
      city: city,
      state: state,
      zip: zip
    },
    contact: {
      homePhone: homePhone,
      workPhone: workPhone,
      cellPhone: cellPhone,
      email: email
    },
    birthDate: birthDate,
    imageUrl: "https://react.semantic-ui.com/images/avatar/large/matthew.png",
    files: [],
    cases: []
  };
  console.log("Adding the user")
  console.log(userData)
  let axiosResponse = await API.post(
    "/admin/client",
    userData,
    { headers: { Authorization: `Bearer ${Cookies.get("jwt")}` } }
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

const addCase = async (
  type,
  startDate,
  completed,
  steps,
  userID
) => {
  let caseData = {
    type: type,
    startDate: startDate,
    caseCompleted: completed,
    steps: steps
  };
  console.log("Adding the user")
  console.log(caseData)
  let axiosResponse = await API.post(
    `user/${userID}/cases`,
    caseData,
    { headers: { Authorization: `Bearer ${Cookies.get("jwt")}` } }
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

export { getEvents, getAllClients, addEvent, addClient, getCaseById, addCase };
