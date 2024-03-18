export interface Order {
    id: number;
    fullname: string;
    email:string;
    phone_number:string;
    address:string;
    note:string;
    order_date:Date;
    status:string;
    total_money:number;
    shipping_method:string;
    shipping_adress:string;
    shipping_date:Date;
    tracking_number:string;
    payment_method:string;
}
