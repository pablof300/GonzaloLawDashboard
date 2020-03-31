import API from "./BaseApi.js";
import Cookies from "js-cookie";

const getEvents = async () => {
    console.log("Doing this?")
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

export { getEvents };
