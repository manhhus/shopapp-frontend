import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './webapp/components/home/home.component';
import { NavbarComponent } from './webapp/components/navbar/navbar.component';
import { FooterComponent } from './webapp/components/footer/footer.component';
import { DetailProductComponent } from './webapp/components/detail-product/detail-product.component';
import { OrderComponent } from './webapp/components/order/order.component';

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
