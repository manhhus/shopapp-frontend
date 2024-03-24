import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderComponent } from './components/order/order.component';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardFn } from './guards/auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { OrderedListComponent } from './components/ordered-list/ordered-list.component';
// import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: '', component: HomeComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'detail-product/:id', component: DetailProductComponent },
  { path: 'order', component: OrderComponent,canActivate:[AuthGuardFn] },
  { path: 'order-confirm/:id', component: OrderConfirmComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-profile', component: UserProfileComponent,canActivate:[AuthGuardFn] },
  { path: 'ordered-list', component: OrderedListComponent,canActivate:[AuthGuardFn] },
  // { path: 'payment', component: PaymentComponent,canActivate:[AuthGuardFn] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebappRoutingModule { }
