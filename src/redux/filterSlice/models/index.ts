export type TSortType = {
    id: number,
    name: 'популярности(по возрастания)' | 'популярности(по убыванию)' |
    'цене(по возрастания)' | 'цене(по убыванию)' | 'алфавиту(по возрастания)' |
    'алфавиту(по убыванию)',
    sortProperty: 'rating' | 'price' | 'title',
    order: 'asc' | 'desc',
  }

export type TFilterParams = {
    category: string,
    page: string,
    sortType: TSortType,
  }
  
export interface IFilterState {
    categoryId: number,
    currentPage: number,
    searchValue: string,
    sortType: TSortType,
  }