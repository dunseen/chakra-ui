import axios from "axios";

const apiAuth = axios.create({
  baseURL: "http://localhost:3333",
});

export default apiAuth;
