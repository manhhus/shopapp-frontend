import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { enviroment } from '../../enviroments/enviroment';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { OrderDTO } from '../../dtos/order/order.dto';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit{
  orderForm: FormGroup;
  cartItems: { product:Product, quantity:number} [] = [];
  couponCode: string = '';
  totalAmount: number = 0;
  orderData:OrderDTO = {
    user_id: 0,
    fullname: '',
    phone_number: '',
    address: '',
    email: '',
    note: '',
    total_money: 0,
    shipping_method: 'cod',
    payment_method: 'express',
    cart_items: []

  }
  constructor(private cartService:CartService, private productService: ProductService
            , private orderService:OrderService, private router: Router, private formBuilder: FormBuilder
            , private tokenService: TokenService) {
    this.orderForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.email]],
      address: ['', [Validators.required]],
      note: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.orderData.user_id = this.tokenService.getUserId();
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys());
    if(productIds.length === 0) {
      return;
    }
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
        this.calculateTotal()
      }, error:(error:any) => {
        console.error('error fetching cart');
      }
    });
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity, 0
    );
    this.totalAmount = this.totalAmount * this.applyCoupon()
  }
  applyCoupon() {
    return 1;
  }

  placeOrder(){
    this.orderData.cart_items = this.cartItems.map(item => ({
      product_id: item.product.id,
      quantity: item.quantity,
    }));
    this.orderData.total_money = this.totalAmount;
    this.orderService.placeOrder(this.orderData).subscribe({
      next: (response:any) => {
          this.cartService.clearCart()
          this.router.navigate(['/order-confirm', response.id]);
      }, complete: () => {

      }, error: (error:any) => {
        console.error('error fetching order');
      }
    })
  }

}
