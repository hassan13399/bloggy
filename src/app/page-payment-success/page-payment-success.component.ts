import { Component, OnInit } from '@angular/core';
import {PaymentComponent} from '../bloc/payment/payment.component';

@Component({
  selector: 'app-page-payment-success',
  templateUrl: './page-payment-success.component.html',
  styleUrls: ['./page-payment-success.component.scss']
})
export class PagePaymentSuccessComponent implements OnInit {

  public paymentBloc = PaymentComponent;

  constructor() { }

  ngOnInit() {
  }

}
