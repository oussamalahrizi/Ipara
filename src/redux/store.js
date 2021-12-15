import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice";
export default configureStore({
  reducer: {
    cart: CartReducer,
  },
});
