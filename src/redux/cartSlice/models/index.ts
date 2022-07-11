export type TCartItem = {
    id: string,
    title: string,
    imageUrl: string,
    count: number,
    size: number,
    type: string,
    price: number,
  }
  
export interface ICartState {
    totalPrice: number,
    items: TCartItem[],
    count: number,
  }