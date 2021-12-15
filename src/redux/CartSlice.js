import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const addToLocal = async (value) => {
  await AsyncStorage.setItem("cart", JSON.stringify(value));
};
const clearLocale = async () => {
  await AsyncStorage.clear();
};
const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        if (
          state.items[itemIndex].quantity >=
          state.items[itemIndex].itemQuantity + action.payload.itemQuantity
        ) {
          state.items[itemIndex].itemQuantity += action.payload.itemQuantity;
          state.totalPrice +=
            action.payload.price * action.payload.itemQuantity;
          state.totalQuantity += action.payload.itemQuantity;
          addToLocal(state);
        } else {
          state.totalPrice +=
            action.payload.price *
            (action.payload.quantity - state.items[itemIndex].itemQuantity);
          state.totalQuantity +=
            action.payload.quantity - state.items[itemIndex].itemQuantity;
          state.items[itemIndex].itemQuantity = action.payload.quantity;
          addToLocal(state);
        }
      } else {
        state.items.push({
          name: action.payload.name,
          price: action.payload.price,
          id: action.payload.id,
          image: action.payload.image,
          quantity: action.payload.quantity,
          itemQuantity: action.payload.itemQuantity,
        });
        state.totalPrice += action.payload.price * action.payload.itemQuantity;
        state.totalQuantity += action.payload.itemQuantity;
        addToLocal(state);
      }
    },
    importLocal: (state, action) => {
      state.items.push(...action.payload.items);
      state.totalPrice += action.payload.totalPrice;
      state.totalQuantity += action.payload.totalQuantity;
    },
    deleteFromCart: (state, action) => {
      state.totalPrice -= action.payload.price * action.payload.itemQuantity;
      state.totalQuantity -= action.payload.itemQuantity;
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      addToLocal(state);
    },
    ClearCart: () => {
      clearLocale();
      return {
        items: [],
        totalPrice: 0,
        totalQuantity: 0,
      };
    },
    increaseQuantity: (state, action) => {
      state.items.map((item) => {
        if (item.id === action.payload.id) {
          if (item.quantity > item.itemQuantity) {
            item.itemQuantity += 1;
            state.totalQuantity += 1;
            state.totalPrice += item.price;
            addToLocal(state);
            return;
          }
        }
      });
    },
    decreaseQuantity: (state, action) => {
      state.items.map((item) => {
        if (item.id === action.payload.id) {
          if (item.itemQuantity > 1) {
            item.itemQuantity -= 1;
            state.totalQuantity -= 1;
            state.totalPrice -= item.price;
            addToLocal(state);
            return;
          }
        }
      });
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  importLocal,
  ClearCart,
  increaseQuantity,
  decreaseQuantity,
} = CartSlice.actions;
export default CartSlice.reducer;
