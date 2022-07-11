import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IFilterState, TFilterParams, TSortType } from './models';

const initialState: IFilterState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
  sortType: {
    id: 1,
    name: 'популярности(по убыванию)',
    sortProperty: 'rating',
    order: 'desc',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<TSortType>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<TFilterParams>) {
      state.categoryId = Number(action.payload.category);
      state.currentPage = Number(action.payload.page);
      state.sortType = action.payload.sortType;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const filterSelector = (state: RootState) => state.filter;
export const categoryIdSelector = (state: RootState) => state.filter.categoryId;
export const currentPageSelector = (state: RootState) => state.filter.currentPage;

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
