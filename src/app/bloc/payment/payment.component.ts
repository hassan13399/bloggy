import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {StRemoteDataService} from '../../st-forms/st-remote-data.service';
import {HttpClient} from '@angular/common/http';
import {PremiumService} from '../../services/premium.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  /**
   * The price to charge
   * @type {number}
   * @private
   */
  public amount: number;

  /**
   * The transaction currency code
   * @type {string}
   * @private
   */
  private _currency = 'EUR';

  /**
   * The user object
   * @type { email, name }
   * @private
   */
  private _user: { email: string, name: string };

  /**
   * Show Payment Methods
   * @type {boolean}
   */
  public showPaymentMethods = true;

  /**
   * Show card form if user has selected
   * cards payment method
   * @type {boolean}
   */
  public showCardForm = false;

  /**
   * Show the card form submit button or hide
   * it to avoid multiple payment submission
   * @type {boolean}
   */
  public showCardFormSubmitButton = true;

  /**
   * Show the loading spinner
   * @type {boolean}
   */
  public showLoading = false;

  /**
   * Card element for stripe form
   */
  private card: any;

  /**
   * Error message when submitting charge request
   * @type {null|string}
   */
  public error: string|null = null;

  /**
   * The card form view child.
   */
  @ViewChild('cardElement') cardElement: ElementRef;

  /**
   * Constructor
   * @param {ActivatedRoute}      _route
   * @param {ChangeDetectorRef}   _changeDetector
   * @param {StRemoteDataService} _remoteService
   * @param {HttpClient}          _http
   * @param {Router}              _router
   */
  constructor(
    private _route: ActivatedRoute,
    private _changeDetector: ChangeDetectorRef,
    private _remoteService: StRemoteDataService,
    private _http: HttpClient,
    private _router: Router,
    private _premiumService: PremiumService
  ) {}

  /**
   * Implements OnInit
   */
  public ngOnInit () {
    this.amount = environment.premium_price;
    // Load user profile
    this._remoteService.loadProfile().subscribe((data: any) => {
      if (!this._premiumService.shouldPay()) {
        this._router.navigate(['']);
      }
      this._user = {
        name: data.name + ' ' + data.firstname,
        email: data.email
      };
    });
    // Find out if it came from stripe as return url
    this._route.queryParams.subscribe(params => {
      // Query came from stripe
      if (params.source && params.client_secret) {
        this.showLoading = true;
        this.showPaymentMethods = false;
        this.charge(params.source);
      }
    });
  }

  /**
   * User has chosen cards payment method.
   * Show card form and hide payment methods.
   */
  public cardPayment(): void {
    this.showPaymentMethods = false;
    this.showCardForm = true;
    this.showCardFormSubmitButton = true;
    this._changeDetector.detectChanges();
    // Create card form
    this._createCardForm();
  }

  /**
   * User has chosen bancontact payment method.
   * Redirect to Stripe payment page.
   */
  public bancontactPayment(): void {
    this.showPaymentMethods = false;
    this.showLoading = true;
    stripe.createSource({
      type: 'bancontact',
      amount: this.amount,
      currency: this._currency,
      owner: {
        name: this._user.name
      },
      redirect: {
        return_url: environment.websiteUrl + '/premium/payment'
      }
    }).then((result) => {
      if (result.source) {
        window.location.href = result.source.redirect.url;
      }
    });
  }

  /**
   * Create tje card form
   * @private
   */
  private _createCardForm(): void {
    const elements = stripe.elements();
    const style = {
      base: {
        color: '#32325d',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    const card = elements.create('card', { hidePostalCode: true, style: style });
    card.mount(this.cardElement.nativeElement);
    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', (event) => {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
    this.card = card;
  }

  /**
   * Submit the payment form
   */
  public submitCardForm() {
    this.showCardFormSubmitButton = false;
    const component = this;
    stripe.createToken(this.card, { name: this._user.name }).then((result) => {
      if (result.error) {
        component.showCardFormSubmitButton = true;
        // Inform the user if there was an error.
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        component.showLoading = true;
        component.showCardForm = false;
        component.charge(result.token.id);
      }
    });
  }

  /**
   * Send request to server to charge the
   * given payment.
   * @param token
   */
  public charge(token) {
    this.error = null;
    this._http
      .post(
        environment.remoteUrl + '/payment/charge',
        { source: token })
      .subscribe((data: any) => {
        if (data.status === 'OK') {
          this._remoteService.storeUserValue('is_premium', true);
          this._router.navigate(['/premium/payment/success']);
        } else {
          this.error = data.message;
          this.showPaymentMethods = true;
          this.showCardForm = false;
          this.showLoading = false;
        }
      });
  }
}
