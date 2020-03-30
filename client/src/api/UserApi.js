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
      if (error !== null && error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to retrieve user!"
      };
    });

  return axiosResponse;
};

const getAllUserFiles = async () => {
  const user = (await getCurrentUser()).data;
  let allFiles = [];
  if(user.files){
    const filesID = user.files;
    for (let i = 0; i < filesID.length; i++) {
      const data = (await getUserFileById(filesID[i])).data;
      if (data) {
        allFiles.unshift(data);
      }
    }
  }
 
  return allFiles;
};

const checkIfUserUploadingFileExist = async (fileName, fileType) => {
  const user = (await getCurrentUser()).data;
  if(user.files){
    const filesID = user.files;
    for (let i = 0; i < filesID.length; i++) {
      const data = (await getUserFileById(filesID[i])).data;
      if (data.name === fileName && data.type === fileType) {
        return true;
      }
    }
  }
  return false;
};

const getAllLawyersWorkingOnUserCase = async () => {
  const user = (await getCurrentUser()).data;
  let result = null;
  if (user) {
    const userID = user._id;
    result = await API.get("/admin/:allAdmins").then(res => {
      const lawyers = res.data.data;
      let userLawyers = [];
      for (let i = 0; i < lawyers.length; i++) {
        if (lawyers[i] && lawyers[i].clients) {
          const lawyer = lawyers[i];
          const clients = lawyers[i].clients;
          for (let j = 0; j < clients.length; j++) {
            if (clients[j] === userID) {
              userLawyers.push(lawyer);
              break;
            }
          }
        }
      }
      return userLawyers;
    });
  }

  return result;
};

const uploadUserProfilePicture = params => {
  console.log("Preparing to upload Profile Picture");
  API.post("/fileAws", {
    fileName: params.fileName,
    fileType: params.fileType,
    userID: params.userID,
    folder: "profilePicture"
  })
    .then(response => {
      let returnData = response.data.data.returnData;
      let signedRequest = returnData.signedRequest;
      const url = returnData.url;
      let options = {
        headers: {
          "Content-Type": params.fileType
        }
      };

      API.put(signedRequest, params.file[0], options)
        .then(result => {
          console.log("We got response from s3");

          const userData = {
            imageUrl: url
          };
          updateUserData(userData).then(res => {
            if (res) {
              alert("Profile Picture updated successfully");
              console.log("Profile Picture updated successfully");
            }
          });
        })
        .catch(error => {
          alert(JSON.stringify(error));
        });
    })
    .catch(error => {
      alert(JSON.stringify(error));
    });
};

const getUserFileById = async id => {
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

const deleteUserFileById = async params => {
  const user = (await getCurrentUser()).data;
  let result = false;
  result = await API.delete("/fileAws", {
    data: {
      fileName: params.fileName,
      userID: user._id,
      folder: params.folder
    }
  })
    .then(res => {
      if (res.data.success) {
        const deleteFromDB = async () => {
          const res = await API.delete(`/files/${params.id}`, {
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

export {
  uploadUserProfilePicture,
  getCurrentUser,
  updateUserData,
  getAllUserFiles,
  deleteUserFileById,
  getAllLawyersWorkingOnUserCase,
  checkIfUserUploadingFileExist
};
