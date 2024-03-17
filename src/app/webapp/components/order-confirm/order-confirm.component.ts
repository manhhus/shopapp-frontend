import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Product } from '../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { enviroment } from '../../enviroments/enviroment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,CommonModule, FormsModule],
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.scss'
})
export class OrderConfirmComponent implements OnInit{
  cartItems: { product:Product, quantity:number} [] = [];
 
  constructor(private cartService:CartService, private productService: ProductService,private router: Router) {

  }

  ngOnInit(): void {
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys());
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {
        this.cartItems = productIds.map((productId) => {
          const product = products.find((p) => p.id === productId);
          if(product) {
            product.thumbnail = `${enviroment.apiBaseUrl}/products/images/${ product.thumbnail }`;
          }
          return { product: product!, quantity: cart.get(productId)! };

        });
      }, complete: () => {
      }, error:(error:any) => {
        console.error('error fetching cart');
      }
    });
  }

  onHome(){
    this.router.navigate(['/webapp/home']);
  }

}
