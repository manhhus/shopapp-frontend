import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { enviroment } from '../enviroments/enviroment';
import { OrderDTO } from '../dtos/order/order.dto';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
    private apiOrder = `${enviroment.apiBaseUrl}/orders`;



    constructor(private htpp: HttpClient, private tokenService:TokenService){
    }
    placeOrder(orderData:OrderDTO) {
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'});
        if (token) {
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            });
            return this.htpp.post(this.apiOrder, orderData, { headers });
        } else {
            return this.htpp.post(this.apiOrder, orderData, { headers });
        }
    }

    getOrderById(orderId:number) {
        return this.htpp.get(`${this.apiOrder}/${orderId}`);
    }

    getOrderedList(userId:number) {
        return this.htpp.get(`${this.apiOrder}/user/${userId}`);
    }

}
