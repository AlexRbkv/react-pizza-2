import { TCartItem } from "../redux/cartSlice/models";

export const getCartItemsFromLocalStorage = () => {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
}

export const getCartLengthFromLocalStorage = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    return items.reduce((prev: number, item: TCartItem) => prev + item.count, 0);
}

export const getCartTotalPriceFromLocalStorage = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    return items.reduce((sum: number, obj: TCartItem) => {
        // Считаем общую сумму корзины
        return obj.price * obj.count + sum;
    }, 0);
}