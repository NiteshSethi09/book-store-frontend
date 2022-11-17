import axios from "axios";
import { endpoints } from "./config";

export const axiosInstance = axios.create({
  baseURL: endpoints[import.meta.env.VITE_NODE_ENV as keyof typeof endpoints],
});
