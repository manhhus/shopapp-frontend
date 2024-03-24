import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from '../enviroments/enviroment';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private apiOrder = `${enviroment.apiBaseUrl}`;
    token = this.tokenService.getToken();
    constructor(private http: HttpClient, private tokenService: TokenService) {
    }
    placePayment(orderId: number):Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        if (this.token) {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            });
            return this.http.get(`${this.apiOrder}/payment/${orderId}`, { headers, responseType: 'text'});
        } else {
            return this.http.get(`${this.apiOrder}/payment/${orderId}`, { headers, responseType: 'text' });
        }
    }

    setPaid(orderId:number):Observable<any> {
        return this.http.post(`${this.apiOrder}/orders/paid/${orderId}`, {}, { headers : new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        })})
    }

}
