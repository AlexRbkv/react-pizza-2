import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartItemsFromLocalStorage, getCartLengthFromLocalStorage, getCartTotalPriceFromLocalStorage } from '../../utils/getCartFromLocalStorage';

import { RootState } from '../store';
import { ICartState, TCartItem } from './models';

const initialState: ICartState = {
  totalPrice: getCartTotalPriceFromLocalStorage(),
  items: getCartItemsFromLocalStorage(),
  count: getCartLengthFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TCartItem>) {
      const addedItem = state.items.find((obj) => obj.id === action.payload.id); // Определяем, есть ли в хранилище элемент с входящим id
      if (addedItem) {
        addedItem.count++; // Если есть, то увеличиваем его свойство count
      } else {
        state.items.push({ ...action.payload, count: 1 }); // Если нет, то добавляем его с count = 1
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        // Считаем общую сумму корзины
        return obj.price * obj.count + sum;
      }, 0);
      state.count = state.items.reduce((prev, item) => prev + item.count, 0);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice = state.totalPrice - findItem.price;
      }
      state.count = state.items.reduce((prev, item) => prev + item.count, 0);
    },
    removeItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload);
			if (findItem) {
				state.totalPrice = state.totalPrice - findItem.price * findItem.count;
			}
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.count = state.items.reduce((prev, item) => prev + item.count, 0);
    },
    clearCart(state) {
      state.items = [];
      state.count = 0;
      state.totalPrice = 0;
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;

export const { addItem, removeItem, clearCart, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
