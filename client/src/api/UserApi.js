import API from "./BaseApi.js";
import Cookies from "js-cookie";

const getCurrentUser = async () => {
  let axiosResponse = await API.get("/user/", {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error !== null && error.response) {
        return { error: error.response };
      }
      return {
        error: "Unable to retrieve user!",
      };
    });

  return axiosResponse;
};

const sendMessageToTeam = async (params) => {
  API.post(`/user/message`, params, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return true;
};

const sendEmailWithoutAuth = async (params, id, name) => {
  let result = null;
  result = await API.post(`/codes/postCode/${id}`, params)
    .then((res) => {
      if (res.data && res.data.data) {
        const data = res.data.data;
        const code = data.code;
        const message = `<h3>Hi ${name},</h3> <p>Use the code below to help reset your password.</p> <p><h2><b>${code}</b></h2></p>`;
        const from = "GonzaloLaw <no-reply@mail.gonzalolaw.com>";
        params.from = from;
        params.html = message;
       const resultR =  API.post("codes/email/emailCode", params)
       console.log(resultR)
       return resultR;
      }
    })
    .catch((error) => {
      if (error && error.response) {
        console.log(error.response);
        return false;
      }
    });
};

const sendEmail = async (params, id, name) => {
  let result = null;
  result = await API.post(`/codes/${id}`, params, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((res) => {
      if (res.data && res.data.data) {
        const data = res.data.data;
        const code = data.code;
        const message = `<h3>Hi ${name},</h3> <p>Use the code below to help reset your password.</p> <p><h2><b>${code}</b></h2></p>`;
        const from = "GonzaloLaw <no-reply@mail.gonzalolaw.com>";
        params.from = from;
        params.html = message;
        const sEmail = async () => {
          const emailSend = await API.post("codes/mail", params, {
            headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
          })
            .then((res) => {
              if (res) {
                alert("A verification Code was sent to your email");
              }
              return true;
            })
            .catch((err) => {
              console.log(err);
              return false;
            });

          return emailSend;
        };
        return sEmail();
      }
    })
    .catch((error) => {
      if (error && error.response) {
        console.log(error.response);
        return false;
      }
    });
  return result;
};

const updatePasswordAtLogin = async (params, id) => {
  let axiosResponse = await API.put(`/user/password/${id}`, params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error !== null && error.response) {
        return { error: error.response };
      }
      return {
        error: "Unable to retrieve user!",
      };
    });

  return axiosResponse;
};

const updatePassword = async (params) => {
  const success = await updateUserData(params).then((res) => {
    if (res) {
      console.log("Password changed successfully");
      return true;
    }
    return false;
  });

  return success;
};

const getUserByIdUser = async (id) => {
  let axiosResponse = await API.get(`/user/getUserCalendarUser/${id}`, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error !== null && error.response) {
        return { error: error.response };
      }
      return {
        error: "Unable to retrieve user!",
      };
    });

  return axiosResponse;
};

const getUserByIdAdmin = async (id) => {
  let axiosResponse = await API.get(`/user/getUserCalendarAdmin/${id}`, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error !== null && error.response) {
        return { error: error.response };
      }
      return {
        error: "Unable to retrieve user!",
      };
    });

  return axiosResponse;
};

const getAllUserFiles = async () => {
  const user = (await getCurrentUser()).data;
  const id = user._id;
  let axiosResponse = await API.get(`/files/${id}`, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error && error.response) {
        return { error: error.response };
      }
      return {
        error: "Unable to retrieve all user's files!",
      };
    });

  return axiosResponse;
};

const checkIfCodeExistOrHasNotExpiredWithoutAuth = async (code, id) => {
  let axiosResponse = await API.get(`/codes/getCode/${code}/${id}`)
    .then((response) => {
      // console.log(response)
      console.log(response)
      if (response && response.data && response.data.ok) {
        //edwarddubi400@gmail.com
        return true;
      }
      return false;
    })
    .catch((error) => {
      if (error !== null && error.response) {
        // console.log( error.response)
        return false;
      }
      return {
        error: "Unable to retrieve user!",
      };
    });

  return axiosResponse;
};

const checkIfCodeExistOrHasNotExpired = async (code, id) => {
  let axiosResponse = await API.get(`/codes/${code}/${id}`, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      // console.log(response)
      if (response && response.data && response.data.data) {
        ///console.log(response)
        return true;
      }
      return false;
    })
    .catch((error) => {
      if (error !== null && error.response) {
        // console.log( error.response)
        return false;
      }
      return {
        error: "Unable to retrieve user!",
      };
    });

  return axiosResponse;
};

const getAllLawyersWorkingOnUserCase = async () => {
  const user = (await getCurrentUser()).data;
  let result = null;
  if (user) {
    const userID = user._id;
    result = await API.get(`/admin/userLawyers/${userID}`, {
      headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (error && error.response) {
          return { error: error.response };
        }
        return {
          error: "Unable to retrieve user lawyers!",
        };
      });
  }
  return result;
};

const uploadUserProfilePicture = async (params, callRes) => {
  console.log("Preparing to upload Profile Picture");
  let axiosResponse = await API.post("/fileAws", {
    fileName: params.fileName,
    fileType: params.fileType,
    userID: params.userID,
    folder: "profilePicture",
  })
    .then((response) => {
      let returnData = response.data.data.returnData;
      let signedRequest = returnData.signedRequest;
      const url = returnData.url;
      let options = {
        headers: {
          "Content-Type": params.fileType,
        },
      };

      return API.put(signedRequest, params.file[0], options)
        .then((result) => {
          console.log("We got response from s3");

          const userData = {
            imageUrl: url,
          };
          const res = updateUserData(userData);
          return res;
        })
        .catch((error) => {
          alert(JSON.stringify(error));
          return error;
        });
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      return error;
    });
  return axiosResponse;
};

const getUserByEmail = async (email) => {
  let axiosResponse = await API.get(`/user/email/${email}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error && error.response) {
        return { error: error.response };
      }
      return {
        error: "User does not exist!",
      };
    });

  return axiosResponse;
};

const checkIfUserUploadingFileExist = async (fileName, fileType) => {
  const user = (await getCurrentUser()).data;
  let axiosResponse = null;
  if (user) {
    axiosResponse = await API.get(`/files/${user._id}`, {
      headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
    })
      .then((response) => {
        const file = response.data.data;
        let i = 0;
        for (; i < file.length; i++) {
          if (
            file[i].name === fileName &&
            file[i].type.toLowerCase() === fileType.toLowerCase()
          ) {
            return true;
          }
        }
        if (i === file.length) {
          return false;
        }
      })
      .catch((error) => {
        if (error.response) {
          return { error: error.response.data.error };
        }
        return {
          error: "Unable to retrieve file!",
        };
      });
    return axiosResponse;
  }
  return axiosResponse;
};

const deleteUserFileById = async (params) => {
  const user = (await getCurrentUser()).data;
  let result = false;
  if (user) {
    result = await API.delete("/fileAws", {
      data: {
        fileName: params.fileName,
        userID: user._id,
        folder: params.folder,
      },
    })
      .then((res) => {
        if (res.data.success) {
          const deleteFromDB = async () => {
            const res = await API.delete(`/files/${params.id}`, {
              headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
            })
              .then((response) => {
                return response.data.ok;
              })
              .catch((error) => {
                if (error && error.response)
                  console.log("ERROR! " + error.response);
              });
            return res;
          };
          return deleteFromDB();
        }
      })
      .catch((error) => {
        if (error && error.response) {
          console.log("File failed to delete!");
          console.log(error.response);
        }
        result = false;
      });
  }

  return result;
};

const updateUserData = async (data) => {
  let axiosResponse = await API.put("/user", data, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error !== null && error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to update user information!",
      };
    });

  return axiosResponse;
};

const getEvents = async () => {
  let axiosResponse = await API.get("/user/events", {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to retrieve events!",
      };
    });
  return axiosResponse;
};

export {
  getEvents,
  uploadUserProfilePicture,
  getCurrentUser,
  updateUserData,
  sendEmail,
  getAllUserFiles,
  deleteUserFileById,
  updatePassword,
  getUserByEmail,
  updatePasswordAtLogin,
  getAllLawyersWorkingOnUserCase,
  checkIfUserUploadingFileExist,
  getUserByIdAdmin,
  getUserByIdUser,
  sendEmailWithoutAuth,
  checkIfCodeExistOrHasNotExpired,
  sendMessageToTeam,
  checkIfCodeExistOrHasNotExpiredWithoutAuth,
};
