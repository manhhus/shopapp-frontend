import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';
import { Product } from '../components/models/product';
import { OrderDTO } from '../dtos/order/order.dto';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
    private apiPostOrder = `${enviroment.apiBaseUrl}/orders`;

  private apiConfig = {
    headers: this.createHeader()
  }
  private createHeader(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
    constructor(private htpp: HttpClient){
    }
    placeOrder(orderData:OrderDTO) {
        return this.htpp.post(this.apiPostOrder, orderData, this.apiConfig);
      }
}
