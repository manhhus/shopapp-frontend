import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';
import { Category } from '../components/models/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    private apiGetCategories = `${enviroment.apiBaseUrl}/categories`;
    constructor(private htpp: HttpClient){
    }

    getCategories(page:number, limit:number): Observable<Category[]> {
        const params = new HttpParams()
                            .set('page', page.toString())
                            .set('limit', limit.toString());
        return this.htpp.get<Category[]>(this.apiGetCategories, {params});
    }
 }