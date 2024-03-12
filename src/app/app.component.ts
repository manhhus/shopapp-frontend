import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './webapp/home/home.component';
import { NavbarComponent } from './webapp/navbar/navbar.component';
import { FooterComponent } from './webapp/footer/footer.component';
import { DetailProductComponent } from './webapp/detail-product/detail-product.component';
import { OrderComponent } from './webapp/order/order.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,NavbarComponent,FooterComponent,DetailProductComponent,OrderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shopapp-angular';
}
