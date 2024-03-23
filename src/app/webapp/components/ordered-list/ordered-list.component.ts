import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { OrderedList } from '../../models/ordered.list';
import { TokenService } from '../../services/token.service';
import { OrderResponse } from '../../models/order.response';
import { enviroment } from '../../enviroments/enviroment';
import { OrderDetail } from '../../models/order.detail';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ordered-list',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './ordered-list.component.html',
  styleUrl: './ordered-list.component.scss'
})
export class OrderedListComponent implements OnInit {
  ordered_list?: OrderResponse[];
  constructor(private orderService: OrderService, private router: Router,
    private tokenService: TokenService
  ) {

  }
  ngOnInit(): void {
    this.getOrderedList(this.tokenService.getUserId());
  }

  getOrderedList(userId: number) {
    this.orderService.getOrderedList(userId).subscribe({
      next: (response: any) => {
        this.ordered_list = response.map((order: any) => {
          const orderResponse: OrderResponse = {
            id: order.id,
            user_id: order.user_id,
            fullname: order.fullname,
            email: order.email,
            phone_number: order.phone_number,
            address: order.address,
            note: order.note,
            order_date: new Date(order.order_date[0], order.order_date[1] - 1, order.order_date[2]),
            status: order.status,
            total_money: order.total_money,
            shipping_method: order.shipping_method,
            shipping_date: new Date(order.shipping_date[0], order.shipping_date[1] - 1, order.shipping_date[2]),
            payment_method: order.payment_method,
            order_details: order.order_details.map((order_detail: OrderDetail) => {
              if (order_detail.product.thumbnail != null) {
                if (!order_detail.product.thumbnail.startsWith(`${enviroment.apiBaseUrl}/products/images/`)) {
                  order_detail.product.thumbnail = `${enviroment.apiBaseUrl}/products/images/${order_detail.product.thumbnail}`;
                }
              }
              else {
                order_detail.product.thumbnail = `${enviroment.apiBaseUrl}/products/images/notfound.jpg`;
              }
              return order_detail;
            }),
            shipping_address: order.shipping_address,
            pay: order.pay
          };
          return orderResponse;
        });
      }, complete: () => {

      },
      error: (error: any) => {
        console.error('Error fetching order list:', error);
      }
    });
  }
}
