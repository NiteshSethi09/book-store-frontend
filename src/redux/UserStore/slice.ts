import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./service";

export interface User {
  _id: string;
  name: string;
  email: string;
  verified: boolean;
}
export interface Auth {
  user: User | null;
  authenticated: boolean;
}

const initialState: Auth = {
  user:
    ((JSON.parse(localStorage.getItem("user")!) as Auth)?.user as User) || null,
  authenticated:
    (JSON.parse(localStorage.getItem("user")!) as Auth)?.authenticated || false,
};

localStorage.setItem("user", JSON.stringify(initialState));

export const login = createAsyncThunk(
  "user/login",
  async (user: { email: string; password: string }, thunkAPI) => {
    try {
      return await userService.login(user!);
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  return await userService.logout();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.authenticated = false;
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.authenticated = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authenticated = false;
        state.user = null;
      });
  },
});

export default userSlice.reducer;
