
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalPrice: 0,
  totalItems: 0,
};

const userCartSlice = createSlice({
  initialState,
  name: "userCart",
  reducers: {
    addToCart: (state, action) => {
      const { name, url, id, size, price } = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.id === id && item.size === size,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          id,
          name,
          url,
          size,
          price,
          quantity: 1,
        });
      }
    },

    removeFromCart: (state, action) => {
      const { id, size } = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => !(item.id === id && item.size === size),
      );
    },

    clearWholeCart: (state) => {
      state.cartItems = [];
    },
    updateCountItem: (state, action) => {
      const { id, size, quantity } = action.payload;

      const item = state.cartItems.find(
        (item) => item.id === id && item.size === size,
      );

      if (item) {
        item.quantity = quantity;

        if (item.quantity <= 0) {
          state.cartItems = state.cartItems.filter(
            (i) => !(i.id === id && i.size === size),
          );
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCountItem, clearWholeCart } =
  userCartSlice.actions;
export default userCartSlice.reducer;
