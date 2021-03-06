import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { signOut } from "../contexts/AuthContext";
import { AuthTokenError } from "./errors/AuthTokenError";

let isRefreshing = false;
let failedRequestsQueue = [];

export function setupAPICliente(ctx = undefined) {
  let cookies = parseCookies(ctx);

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
          cookies = parseCookies(ctx);

          const { "dashgo.refreshToken": refreshToken } = cookies;
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            apiAuth
              .post("/refresh", { refreshToken })
              .then((response) => {
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

                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(token)
                );
                failedRequestsQueue = [];
              })
              .catch((error) => {
                failedRequestsQueue.forEach((request) =>
                  request.onFailure(error)
                );
                failedRequestsQueue = [];

                if (process.browser) signOut();
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers["Authorization"] = `Bearer ${token}`;

                resolve(apiAuth(originalConfig));
              },
              onFailure: (error: AxiosError) => {
                reject(error);
              },
            });
          });
        } else {
          if (process.browser) {
            signOut();
          } else {
            return Promise.reject(new AuthTokenError());
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return apiAuth;
}
