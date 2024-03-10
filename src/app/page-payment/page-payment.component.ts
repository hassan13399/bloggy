import { Component, OnInit } from '@angular/core';
import {PaymentComponent} from '../bloc/payment/payment.component';

@Component({
  selector: 'app-page-payment',
  templateUrl: './page-payment.component.html',
  styleUrls: ['./page-payment.component.scss']
})
export class PagePaymentComponent implements OnInit {

  public paymentBloc = PaymentComponent;

  constructor() { }

  ngOnInit() {
  }

}
