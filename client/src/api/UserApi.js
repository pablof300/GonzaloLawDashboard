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

const getUserFiles = async () => {
  const user = (await getCurrentUser()).data;
  const filesID = user.files;
  let allFiles = [];
  for (let i = 0; i < filesID.length; i++) {
    const data = (await getFilesById(filesID[i])).data;
    if (data) {
      allFiles.unshift(data);
    }
  }
  return allFiles;
};

const getFilesById = async id => {
  let axiosResponse = await API.get(`/files/${id}`, {
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
        error: "Unable to retrieve file!"
      };
    });
  return axiosResponse;
};

const deleteFilesFromUser = async (fileName, id) => {
  let result = await API.delete("/fileAws/" + fileName)
    .then(res => {
      if (res.data.success) {
        const deleteFromDB = async () => {
          const res = await API.delete(`/files/${id}`, {
            headers: { Authorization: `Bearer ${Cookies.get("jwt")}` }
          })
            .then(response => {
              return response.data.ok;
            })
            .catch(error => {
              console.log("ERROR! " + error);
            });
          return res;
        };
        return deleteFromDB();
      }
    })
    .catch(error => {
      console.log("File failed to delete!");
      console.log(error);
      result = false;
    });

  return result;
};

const updateUserData = async data => {
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

export { getCurrentUser, updateUserData, getUserFiles, deleteFilesFromUser };
