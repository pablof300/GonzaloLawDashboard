import axios from "axios";

const port = process.env.PORT || 5000;
console.log("#### PORT #####");
console.log(port);
export default axios.create({
  baseURL: "http://localhost:" + port,
  responseType: "json"
});
