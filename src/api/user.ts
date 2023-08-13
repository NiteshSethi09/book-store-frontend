import { axiosInstance } from "@/utils/axiosInstance";

export const userLoginAPI = async (user: {
  email: string;
  password: string;
}) => {
  const result = await axiosInstance.post("/user/login", user);

  return result.data;
};

export const requestResetPasswordAPI = async (email: string) => {
  const result = await axiosInstance.post("/user/reset-password", {
    email,
  });

  return result.data;
};

export const resetPasswordAPI = async (token: string, password: string) => {
  const result = await axiosInstance.post(`/user/reset-password/${token}`, {
    password,
  });

  return result.data;
};

export const userSignupAPI = async (
  name: string,
  email: string,
  password: string
) => {
  const result = await axiosInstance.post("/user/signup", {
    name,
    email,
    password,
  });

  return result.data;
};

export const verifyAccountAPI = async (token: string) => {
  const result = await axiosInstance.post(`/user/verify-account/${token}`);

  return result.data;
};
