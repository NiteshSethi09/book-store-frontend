import axios from "axios";
import { endpoints } from "./config";
import type { Auth } from "@/redux/UserStore/slice";

const backendUrl =
  endpoints[import.meta.env.VITE_NODE_ENV as keyof typeof endpoints];

export const axiosInstance = axios.create({
  baseURL: backendUrl,
});

axiosInstance.interceptors.request.use(function (config) {
  const accessToken = (JSON.parse(localStorage.getItem("user")!) as Auth)?.user
    ?.accessToken;
  config.data = { ...config.data, role: "USER" };
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const prevRequest = err?.config;

    if (err.response.status === 401) {
      const refreshToken: string = (
        JSON.parse(localStorage.getItem("user")!) as Auth
      )?.user?.refreshToken!;

      return await axios
        .get(`${backendUrl}/user/refresh`, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        })
        .then((data) => {
          localStorage.setItem(
            "user",
            JSON.stringify({ user: data.data.user, authenticated: true })
          );
          return data;
        })
        .then((data) =>
          axiosInstance({
            ...prevRequest,
            headers: {
              ...prevRequest.headers,
              Authorization: "Bearer " + data.data.user.accessToken,
            },
          })
        )
        .catch((refreshTokenAPIError) => {
          console.log(refreshTokenAPIError);
          return Promise.reject(refreshTokenAPIError);
        });
    }
    return Promise.reject(err.response);
  }
);
