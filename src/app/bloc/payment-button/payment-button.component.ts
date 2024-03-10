import {Component, OnInit} from '@angular/core';
import {StRemoteDataService} from '../../st-forms/st-remote-data.service';
import {PremiumService} from '../../services/premium.service';

@Component({
  selector: 'app-payment-button',
  templateUrl: './payment-button.component.html'
})
export class PaymentButtonComponent implements OnInit {

  /**
   * If user is authenticated or not. Show button only
   * if user is authenticated
   * @type {boolean}
   */
  public isAuthenticated = false;

  /**
   * If user is premium. Do not show payment button if user
   * is already premium
   * @type {boolean}
   */
  public isPremium = false;

  constructor(
    private _remoteService: StRemoteDataService,
    private _premiumService: PremiumService
  ){}

  ngOnInit(): void {
    if (this._remoteService.isAuthenticated()) {
      this.isAuthenticated = true;
      // Load user profile
      this.isPremium = !this._premiumService.shouldPay();
    }
  }
}