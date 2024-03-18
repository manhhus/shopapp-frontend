import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginDTO } from '../../dtos/user/login.dto';
import { LoginResponse } from '../../responses/user/login.response';
import { TokenService } from '../../services/token.service';
import { UserResponse } from '../../responses/user/user.response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phone: string;
  password: string;
  rememberMe: boolean;
  userResponse?:UserResponse;
  constructor(private http: HttpClient, 
    private router: Router, 
    private userService:UserService,
    private tokenService:TokenService
    ) {
    this.phone = '';
    this.password = '';
    this.rememberMe = false;
  }
  onPhoneChange() {
    console.log(`Phone typed: ${this.phone}`);
  }
  onRememberMe() {
    this.rememberMe = true;
  }
  login(){
    const loginDTO:LoginDTO = {
      "phone_number": this.phone,
      "password": this.password,
    }
    this.userService.login(loginDTO).subscribe(
      {
        next: (response: string) => {
          const token = response;
          if(this.rememberMe) {
            this.tokenService.setToken(token);
            this.userService.getUserDetail(token).subscribe({
              next:(response:any) => {
                  this.userResponse = {
                    id: response.id,
                    fullname: response.fullname,
                    address: response.address,
                    phone_number: response.phone_number,
                    date_of_birth: new Date(response.date_of_birth),
                    facebook_account_id: response.facebook_account_id,
                    google_account_id: response.google_account_id,
                    role_id: response.role_id
                    //userResponse = {
                    //   ...response,
                    //   date_of_birth: new Date(response.date_of_birth)
                    // }
                  };
                  this.userService.saveUserResponseToLocalStorage(this.userResponse);
                  this.router.navigate(['/']);
              }, complete: ()=> {

              }, error: (error:any)=> {
                console.error("error fetching user");
              }
            })
          }
          
        },
        complete: () => {

        }
        ,error: (error:any) => {
          alert(`Cannot login, error: ${error.error}`);
        }
        
      }
    )
  }

  onRegister() {
    this.router.navigate(['/register']);
  }


}
