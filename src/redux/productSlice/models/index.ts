export type ProductType = {
	id: string,
	imageUrl: string,
	price: number,
	rating: number,
	sizes: number[],
	title: string,
	types: number[]
}
  
export enum Status {
	LOADING = "loading",
	SUCCESS = "success",
	ERROR = "error"
}
  
export interface IProductState {
	products: ProductType[],
	status: Status,
}