import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister= `${enviroment.apiBaseUrl}/users/register`;
  private apiLogin= `${enviroment.apiBaseUrl}/users/login`;

  private apiConfig = {
    headers: this.createHeader()
  }
  constructor(private http: HttpClient) { }

  private createHeader(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  register(reisterDTO: RegisterDTO): Observable<any> {
    return this.http.post(this.apiRegister, reisterDTO, this.apiConfig);
  }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO, {
      ...this.apiConfig,
      responseType: 'text'
    });
  
  }


}
