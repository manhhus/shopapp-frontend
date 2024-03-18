import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { enviroment } from '../../enviroments/enviroment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderResponse } from '../../models/order.response';
import { OrderService } from '../../services/order.service';
import { OrderDetail } from '../../models/order.detail';
import { error } from 'console';

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,CommonModule, FormsModule],
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.scss'
})
export class OrderConfirmComponent implements OnInit{
  orderResponse: OrderResponse = {
    id: 0,
    user_id:0,
    fullname: '',
    email:'',
    phone_number:'',
    address:'',
    note:'',
    order_date: new Date(),
    status:'',
    total_money:0,
    shipping_method:'',
    shipping_address:'',
    shipping_date: new Date(),
    payment_method:'',
    order_details: []
  }
 
  constructor(private orderService: OrderService,private router: Router,
    private route:ActivatedRoute) {

  }

  ngOnInit(): void {
    let orderId:number = 0;
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        orderId = +idParam;
      } else {
        console.error('Invalid orderId:', idParam);
      }
    });
    this.getOrderDetails(orderId);
  }
   
  getOrderDetails(orderId:number) {
    
    this.orderService.getOrderById(orderId).subscribe({
      next: (response: any) => {
        this.orderResponse.id = response.id;
        this.orderResponse.user_id = response.user_id;
        this.orderResponse.fullname = response.fullname;
        this.orderResponse.email = response.email;
        this.orderResponse.phone_number = response.phone_number;
        this.orderResponse.address = response.address;
        this.orderResponse.note = response.note;
        this.orderResponse.order_date = new Date(
          response.order_date[0],
          response.order_date[1] - 1,
          response.order_date[2]
        );
        this.orderResponse.status = response.status;
        this.orderResponse.total_money = response.total_money;
        this.orderResponse.shipping_method = response.shipping_method;
        this.orderResponse.shipping_date = new Date(
          response.shipping_date[0],
          response.shipping_date[1] - 1,
          response.shipping_date[2]
        );
        this.orderResponse.payment_method = response.payment_method;
        this.orderResponse.order_details = response.order_details.map(
          (order_detail: OrderDetail) => {
            if (!order_detail.product.thumbnail.startsWith(`${enviroment.apiBaseUrl}/products/images/`)) {
              order_detail.product.thumbnail = `${enviroment.apiBaseUrl}/products/images/${order_detail.product.thumbnail}`
            }
            return order_detail;
          }
        )
      },complete: () => {

      }, error: (error:any) => {
        console.error('error fetching order');
      }
    })
  }

  onHome(){
    this.router.navigate(['/']);
  }

}
