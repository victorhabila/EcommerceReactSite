import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { productsFetch } from "./features/productSlice";
import { productsApi } from "./features/productsApi";
import cartReducer, { getTotals } from "./features/cartSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));

//this store in reduce would serve as a centrel state manager that provides our state accross our entire components
const store = configureStore({
  reducer: {
    product: productsReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  //configuring our custom middleware to add more security and functionalities like caching etc
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());

//dispatching out totals when the application loads
store.dispatch(getTotals());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
