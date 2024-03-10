import { Component, OnInit } from '@angular/core';
import {PaymentButtonComponent} from '../bloc/payment-button/payment-button.component';

@Component({
  selector: 'app-page-formule',
  templateUrl: './page-formule.component.html',
  styleUrls: ['./page-formule.component.scss']
})
export class PageFormuleComponent implements OnInit {

  /**
   *
   * @type {PaymentButtonComponent}
   */
  public paymentButton = PaymentButtonComponent;

  constructor() { }

  ngOnInit() {
  }

}
