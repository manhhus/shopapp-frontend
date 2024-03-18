import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators, AbstractControl, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  userForm: FormGroup;
  phone: string;
  email: string;
  fullName: string;
  address: string;
  dateOfBirth: Date;
  constructor(private formBuilder: FormBuilder) {
    this.fullName = '';
    this.phone = '';
    this.email = ''
    this.address = '';
    this.dateOfBirth = new Date;
    this.userForm = this.formBuilder.group({
      fullname: ['', [Validators.minLength(3)]],
      phone: ['', [Validators.minLength(3)]],
      email: ['', [Validators.email]],
      address: [''],
      password: ['', [Validators.minLength(3)]],
      retypepassword: ['', [Validators.minLength(3)]], 
    });
  }
  
  ngOnInit(): void {
   
  }
  updateUser(){

  }
  get retypePasswordInvalid(): boolean {
    const password = this.userForm.get('password')?.value;
    const retypePassword = this.userForm.get('retypepassword')?.value;
    return password !== retypePassword;
  }
}