import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';
import { Product } from '../components/models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private apiGetProducts = `${enviroment.apiBaseUrl}/products`;
    constructor(private htpp: HttpClient){
    }

    getProducts(keyword: string, selectedCategoryId:number, page:number, limit:number): Observable<Product[]> {
        const params = new HttpParams()
                            .set('keyword', keyword)
                            .set('category_id', selectedCategoryId)
                            .set('page', page.toString())
                            .set('limit', limit.toString());
        return this.htpp.get<Product[]>(this.apiGetProducts, {params});
    }

    getDetailProduct(productId:number) {
      return this.htpp.get(`${enviroment.apiBaseUrl}/products/${productId}`)
    }

    getProductsByIds(productIds: number[]): Observable<Product[]> {
      const params = new HttpParams().set('ids', productIds.join(','));
      return this.htpp.get<Product[]>(`${this.apiGetProducts}/by-ids`, { params });
    }
 }