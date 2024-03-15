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
  constructor(private http: HttpClient, 
    private router: Router, 
    private userService:UserService,
    private tokenService:TokenService
    ) {
    this.phone = '';
    this.password = '';
  }
  onPhoneChange() {
    console.log(`Phone typed: ${this.phone}`);
  }
  login(){
    const loginDTO:LoginDTO = {
      "phone_number": this.phone,
      "password": this.password,
    }
    this.userService.login(loginDTO).subscribe(
      {
        next: (reponse: LoginResponse) => {
          const {token} = reponse;
          this.tokenService.setToken(token);
          alert(`Login successfully`);
          this.router.navigate(['/webapp/home']);
        },
        complete: () => {

        }
        // ,error: (error:any) => {
        //   alert(`Cannot login, error: ${error.error}`);
        // }
        
      }
    )
  }

  onRegister() {
    this.router.navigate(['/webapp/register']);
  }
}
