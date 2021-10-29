import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";

let cookies = parseCookies();

const apiAuth = axios.create({
  baseURL: "http://localhost:3333",
  headers: { Authorization: `Bearer ${cookies["dashgo.token"]}` },
});

apiAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === "token.expired") {
        //refresh token
        cookies = parseCookies();

        const { "dashgo.refreshToken": refreshToken } = cookies;

        apiAuth.post("/refresh", { refreshToken }).then((response) => {
          const { token } = response.data;

          setCookie(undefined, "dashgo.token", token, {
            maxAge: 60 * 60 * 24 * 30, //30d
            path: "/",
          });

          setCookie(
            undefined,
            "dashgo.refreshToken",
            response.data.refreshToken,
            {
              maxAge: 60 * 60 * 24 * 30, //30d
              path: "/",
            }
          );

          apiAuth.defaults.headers["Authorization"] = `Bearer ${token}`;
        });
      } else {
        //logout user
      }
    }
  }
);

export default apiAuth;
