import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IFilterState } from '../filterSlice/models';
import { RootState } from '../store';
import { IProductState, ProductType, Status } from './models';

const initialState: IProductState = {
  products: [],
  status: Status.LOADING, // loading | success | error
};

export const fetchProducts = createAsyncThunk<ProductType[], IFilterState>('products/fetchProducts', async (params) => {
  const { currentPage, categoryId, sortType, searchValue } = params;
  const { data } = await axios.get<ProductType[]>(
    `https://628f89a90e69410599de5a10.mockapi.io/items?page=${currentPage}&limit=4&${
      categoryId ===0 ? '' : `category=${categoryId}`
    }&sortBy=${sortType.sortProperty}&order=${sortType.order}${
      searchValue ? '&' + searchValue : ''
    }`,
  );
  return data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = Status.LOADING;
      state.products = [];   
    });
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = Status.ERROR;
      state.products = [];
    });
  },
});

export const productSelector = (id: string) => (state: RootState) => state.cart.items.find((obj) => obj.id === id);

export const productsDataSelector = (state: RootState) => state.products;

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
