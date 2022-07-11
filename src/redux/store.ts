import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice/filterSlice';
import cartSlice from './cartSlice/cartSlice';
import productsSlice from './productSlice/productsSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartSlice,
    products: productsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
