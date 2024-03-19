import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserResponse } from '../../responses/user/user.response';
import { UpdateUserDTO } from '../../dtos/user/update.user.dto';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup;
  userResponse?: UserResponse;
  token: string = this.tokenService.getToken() ?? '';
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router
    , private tokenService: TokenService) {

    this.userForm = this.formBuilder.group({
      fullname: ['', [Validators.minLength(3)]],
      phone: ['', [Validators.minLength(3)]],
      address: [''],
      password: ['', [Validators.minLength(3)]],
      retypepassword: ['', [Validators.minLength(3)]],
      date_of_birth: ['']
    });
  }

  ngOnInit(): void {
    this.userService.getUserDetail(this.token).subscribe({
      next: (response: any) => {
        this.userResponse = {
          ...response,
          date_of_birth: new Date(response.date_of_birth)
        }
      }, complete: () => {

      }, error: (error: any) => {
        console.error(error.error.message);
      }
    });
  }
  updateUser() {
    if (this.userForm.valid) {
      const updateUserDTO: UpdateUserDTO = {
        fullname: this.userForm.get('fullname')?.value,
        address: this.userForm.get('address')?.value,
        password: this.userForm.get('password')?.value,
        retype_password: this.userForm.get('retype_password')?.value,
        date_of_birth: this.userForm.get('date_of_birth')?.value,
        facebook_account_id: 0,
        google_account_id: 0
      };
      this.userService.updateUserDetail(this.token, updateUserDTO, this.tokenService.getUserId()).subscribe({
        next: (response: any) => {
          this.userService.removeUserResponseFromLocalStorage();
          this.tokenService.removeToken()
          this.router.navigate(['/login']);
        }, complete: () => {

        }, error: (error: any) => {
          console.error(error.error.message);
        }
      });
    }
  }
  get retypePasswordInvalid(): boolean {
    const password = this.userForm.get('password')?.value;
    const retypePassword = this.userForm.get('retypepassword')?.value;
    return password !== retypePassword;
  }
}