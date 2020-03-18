import API from "./BaseApi.js";
import {getCurrentUser} from './UserApi';



const getFiles = async () => {
  const user = (await getCurrentUser()).data;
  let axiosResponse = await API.get(`/files/${user._id}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to retrieve files!"
      };
    });
  return axiosResponse;
};

const deleteFiles = async (fileName, id) => {
  const user = (await getCurrentUser()).data;
  return await API.delete("/fileAws/" + fileName)
    .then(res => {
      if (res.data.success) {
        const deleteFromDB = async () => {
          const res = await API.delete(`/files/${user._id}/${id}`);
          if (res.data.ok) {
            console.log("File successfully deleted");
            return true;
          } else {
            console.log("File failed to delete!");
            return false;
          }
        };
        return deleteFromDB();
      }
    })
    .catch(error => {
      console.log("File failed to delete!");
      console.log(error);
      return false;
    });
};

export { getFiles, deleteFiles };
