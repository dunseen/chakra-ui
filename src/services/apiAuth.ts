import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();

const apiAuth = axios.create({
  baseURL: "http://localhost:3333",
  headers: { Authorization: `Bearer ${cookies["dashgo.token"]}` },
});

export default apiAuth;
