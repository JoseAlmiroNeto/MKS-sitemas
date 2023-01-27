import { createSlice } from "@reduxjs/toolkit";

export interface IConter {
  open: boolean;
  productsShop: Array<object>;
}

const initialState: IConter = {
  open: false,
  productsShop: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    openShopCard: (state) => {
      state.open = true;
    },
    closeShopCard: (state) => {
      state.open = false;
    },
    addCardProduct: (state, action) => {
      let index = state.productsShop.findIndex(
        (val: any) => val.id === action.payload.id
      );
      if (index < 0) {
        state.productsShop = [...state.productsShop, action.payload];
      }
    },
    exclusionProduct: (state, action) => {
      state.productsShop = action.payload;
    },
    incrementDecrementProduct: (state, action) => {
      state.productsShop = action.payload;
    },
  },
});

export const {
  openShopCard,
  closeShopCard,
  addCardProduct,
  exclusionProduct,
  incrementDecrementProduct,
} = todoSlice.actions;
export default todoSlice.reducer;
