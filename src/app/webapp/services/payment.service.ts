import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { enviroment } from '../enviroments/enviroment';
import { OrderDTO } from '../dtos/order/order.dto';
import { TokenService } from './token.service';
import { Url } from 'url';
import { Observable } from 'rxjs';
import { getGlobalVariable } from '../components/global';
@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private apiOrder = `${enviroment.apiBaseUrl}`;
    // order_id: number = 0;
    constructor(private htpp: HttpClient, private tokenService: TokenService) {
    }
    placePayment(orderId: number):Observable<any> {
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        if (token) {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            });
            return this.htpp.get(`${this.apiOrder}/payment/${orderId}`, { headers, responseType: 'text'});
        } else {
            return this.htpp.get(`${this.apiOrder}/payment/${orderId}`, { headers, responseType: 'text' });
        }
    }
    // setOrderId(id:number) {
    //     this.order_id = id;
    // }
    setPaid() {
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        if (token) {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            });
            return this.htpp.post(`${this.apiOrder}/orders/paid/${getGlobalVariable()}`, {}, { headers });
        } else {
            return this.htpp.post(`${this.apiOrder}/orders/paid/${getGlobalVariable()}`, {}, { headers });
        }
    }

}
