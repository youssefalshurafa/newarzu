import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  items: Cookies.get('bag') ? JSON.parse(Cookies.get('bag')) : [],
};

export const bagSlice = createSlice({
  name: 'bag',
  initialState,
  reducers: {
    addToBag: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.items = [...state.items, tempProduct];
      }
      Cookies.set('bag', JSON.stringify(state.items));
    },
    removeFromBag: (state, action) => {
      const index = state.items.findIndex(
        (bagItem) => bagItem.id === action.payload.id
      );
      let newBag = [...state.items];

      if (index >= 0) {
        newBag.splice(index, 1);
      } else {
        console.warn(`cant remove product (id: ${action.payload})`);
      }
      state.items = newBag;
      Cookies.set('bag', JSON.stringify(newBag));
    },
    decrementFromBag: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let newCart = [...state.items];
      if (state.items[itemIndex].cartQuantity > 1) {
        state.items[itemIndex].cartQuantity -= 1;
      } else if (state.items[itemIndex].cartQuantity === 1) {
        newCart.splice(itemIndex, 1);
      }
      state.items = newCart;
      Cookies.set('bag', JSON.stringify(state.items));
    },
  },
});

export const { addToBag, removeFromBag, decrementFromBag } = bagSlice.actions;

export const selectItems = (state) => state.bag.items;
export const selectTotal = (state) =>
  state.bag.items.reduce(
    (total, item) => total + item.price * item.cartQuantity,
    0
  );

export default bagSlice.reducer;
