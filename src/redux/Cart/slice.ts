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

export const cartActions = {
  addToCart: "cart/addToCart",
  removeFromCart: "cart/removeFromCart",
  orderCreated: "cart/orderCreated",
};

localStorage.setItem("cart", JSON.stringify(initialState));

export const addToCart = createAsyncThunk(
  cartActions.addToCart,
  async (item: string, thunkApi) => {
    try {
      return await cartService.addProduct(item);
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  cartActions.removeFromCart,
  async (item: string, thunkApi) => {
    try {
      return cartService.removeOrDeleteProduct(item);
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const orderCreated = createAsyncThunk(
  cartActions.orderCreated,
  async (item: void, thunkApi) => {
    try {
      return await cartService.orderCreated();
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
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
      })
      .addCase(orderCreated.rejected, (state) => {
        const items = (JSON.parse(localStorage.getItem("cart")!) as Cart)
          ?.items as Item[];
        state.items = items;
      });
  },
});

export default cartSlice.reducer;
