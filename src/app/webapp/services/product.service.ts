import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';
import { Product } from '../components/models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductSerVice {
    private aptGetProducts = `${enviroment.apiBaseUrl}/products`;
    constructor(private htpp: HttpClient){
    }

    getProducts(page:number, limit:number): Observable<Product[]> {
        const params = new HttpParams()
                            .set('page', page.toString())
                            .set('limit', limit.toString());
        return this.htpp.get<Product[]>(this.aptGetProducts, {params});
    }
 }