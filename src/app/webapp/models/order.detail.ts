import { Product } from "./product";

export interface OrderDetail {
    id: number,
    product: Product,
    price:number,
    numberOfProducts:number,
    totalMoney: number,
    color:string
}