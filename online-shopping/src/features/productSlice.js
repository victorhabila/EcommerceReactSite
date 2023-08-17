import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//initializing our state

const initialState = {
  items: [],
  status: null,
};

//action creator
export const productsFetch = createAsyncThunk(
  "product/productsFetch",
  async () => {
    const response = await axios.get("http://localhost:5000/product");
    return response?.data;
  }
);

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      //it like we are mutating a state in a way but thats not it, redux tool kit uses immer to mutate a state immutably
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default productsSlice.reducer;
