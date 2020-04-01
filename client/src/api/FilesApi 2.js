import API from "./BaseApi.js";

const getFiles = async () => {
  let axiosResponse = await API.get("/files")
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
  return await API.delete("/fileAws/" + fileName)
    .then(res => {
      if (res.data.success) {
        const deleteFromDB = async () => {
          const res = await API.delete(`/files/${id}`);
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
