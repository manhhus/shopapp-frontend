import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { UserResponse } from '../../responses/user/user.response';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  userResponse?: UserResponse | null;
  isPopoverOpen = false;

  constructor(private router: Router, private userService: UserService,
    private popoverConfig: NgbPopoverConfig, private tokenService: TokenService
  ) { }
  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }
  onCart() {
    this.router.navigate(['/order']);
  }
  onHome() {
    this.router.navigate(['/']);
  }
  onNotify() {
    this.router.navigate(['/']);
  }
  onLogin() {
    this.router.navigate(['/login']);
  }

  handleItemClick(item: number) {
    if (item === 0) {
      this.router.navigate(['/user-profile']);
    }
    if (item === 1) {
      this.router.navigate(['/ordered-list']);
    }
    else if (item === 2) {
      this.userService.removeUserResponseFromLocalStorage();
      this.tokenService.removeToken();
      this.userResponse = this.userService.getUserResponseFromLocalStorage();
      this.router.navigate(['/login']);
    }
    this.isPopoverOpen = false;
  }
  togglePopover(event: Event) {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }

}
