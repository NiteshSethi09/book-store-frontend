import { userLoginAPI } from "@/api/user";

const login = async (user: { email: string; password: string }) => {
  const data = await userLoginAPI(user);

  if (data.error) {
    throw new Error(data.message);
  }

  localStorage.setItem(
    "user",
    JSON.stringify({ user: data.user, authenticated: true })
  );
  return data.user;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const userService = {
  login,
  logout,
};

export default userService;
