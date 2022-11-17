import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserStore/slice";
import cartSlice from "./Cart/slice";

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
