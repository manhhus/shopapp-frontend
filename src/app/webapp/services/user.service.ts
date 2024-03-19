import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { enviroment } from '../enviroments/enviroment';
import { UserResponse } from '../responses/user/user.response';
import { UpdateUserDTO } from '../dtos/user/update.user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister= `${enviroment.apiBaseUrl}/users/register`;
  private apiLogin= `${enviroment.apiBaseUrl}/users/login`;
  private apiDetails= `${enviroment.apiBaseUrl}/users/details`;

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

  getUserDetail(token: string ):Observable<any> {
    return this.http.post(this.apiDetails,{},{
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}` })
    });
  }
  updateUserDetail(token: string, updateUserDTO:UpdateUserDTO ,user_id:number):Observable<any> {
    return this.http.put(`${this.apiDetails}/${user_id}`, updateUserDTO, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}` })
    });
  }

  saveUserResponseToLocalStorage(userResponse:UserResponse) {
    try{
      const userResponseJSON = JSON.stringify(userResponse);
      localStorage.setItem('userResponse', userResponseJSON);
      console.log('User response saved to localStorage');
    } catch(error) {
      console.error('Error save user response to localStorage', error);
    }
  }
  getUserResponseFromLocalStorage():UserResponse | null{
    try{
      let userResponseJSON = null;
      if (typeof localStorage !== 'undefined') {
        userResponseJSON = localStorage.getItem('userResponse');
      }
      if(userResponseJSON == null || userResponseJSON == undefined){
        return null;
      }
      const userResponse = JSON.parse(userResponseJSON!);
      console.log('User response saved to localStorage');
      return userResponse;
    } catch(error) {
      console.error('Error save user response to localStorage', error);
      return null;
    }
  }

  removeUserResponseFromLocalStorage(){
    try{
      localStorage.removeItem('userResponse');
      console.log('User removed from localStorage');
    } catch(error) {
      console.error('Error save user response to localStorage', error);
    }
  }
}
