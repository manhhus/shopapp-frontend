import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FooterComponent, NavbarComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  responseCode: string;
  order_id: number = 0;
  constructor(private route: ActivatedRoute, private paymentService:PaymentService) {
    this.responseCode = '';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.responseCode = params['vnp_ResponseCode'];
    });
    if (this.responseCode === '00') {
      this.paymentService.setPaid();
    }
  }
  getMessage(): string {
    if (this.responseCode === '00') {
      return 'Payment sucessfully!';
    } else {
      return 'Payment fail!';
    }
  }
}
