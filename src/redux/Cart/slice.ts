import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartService from "./service";

export interface Product {
  price: {
    originalPrice: number;
    offerPrice: number;
  };
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  onSale: false;
  category: string;
}

export interface Item {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: Item[];
}

const initialState: Cart = {
  items:
    ((JSON.parse(localStorage.getItem("cart")!) as Cart)?.items as Item[]) ||
    [],
};

localStorage.setItem("cart", JSON.stringify(initialState));

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item: string, thunkApi) => {
    try {
      return await cartService.addProduct(item);
    } catch (error) {
      thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (item: string, thunkApi) => {
    try {
      return cartService.removeOrDeleteProduct(item);
    } catch (error) {
      thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const orderCreated = createAsyncThunk(
  "cart/orderCreated",
  async (item: string, thunkApi) => {
    try {
      return await cartService.orderCreated();
    } catch (error) {
      console.log(error);

      thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload!;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload!;
      })
      .addCase(orderCreated.fulfilled, (state, action) => {
        state.items = action.payload!;
      });
    // .addCase(orderCreated.rejected, (state, action) => {
    //   state.items = action.payload!;
    // });
  },
});

export default cartSlice.reducer;
