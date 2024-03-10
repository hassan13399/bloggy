import {Component, HostListener, OnInit} from '@angular/core';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {Subscription} from 'rxjs/Subscription';
import {StRemoteDataService} from '../../st-forms/st-remote-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PremiumService} from '../../services/premium.service';
import {RouterExtensionService} from '../../services/router.extension.service';

// for authentication request
const URL = environment.remoteUrl;

@Component({
  selector: 'app-prono-timer',
  templateUrl: './prono-timer.component.html',
  styleUrls: ['./prono-timer.component.scss']
})
export class PronoTimerComponent implements OnInit {

  /**
   * @type {Number}
   * @private
   */
  private _allowedTime: number;

  /**
   * @type {Number}
   * @private
   */
  private _currentTime: number;

  /**
   * @type {Number}
   */
  public minutes: number;

  /**
   * @type {Number}
   */
  public seconds: number;

  /**
   * @type {Subscription}
   * @private
   */
  private _subscription: Subscription;

  /**
   * Set true if timer should be display
   * @type {boolean}
   */
  public showTimer = false;

  /**
   * @type {number}
   * @private
   */
  private _timerId: number;

  /**
   * @type {number}
   * @private
   */
  private _targetId: number;

  /**
   * @type {number}
   * @private
   */
  private _currentUserId: number;

  /**
   * If the timer is active or not
   * @type {boolean}
   * @private
   */
  private _isActive = false;

  /**
   * @type {Subscription}
   * @private
   */
  private _routerSubscription: Subscription;

  /**
   * Execute this script before window is
   * closed to end timer.
   * @param event
   */
  @HostListener('window:beforeunload', ['$event'])
  public beforeunloaHandler(event) {
    this.end(true);
  }

  /**
   * Timer constructor
   * @param {Router}              _router
   * @param {StRemoteDataService} _remoteService
   * @param {HttpClient}          _http
   * @param {ActivatedRoute}      _route
   */
  public constructor(
    private _router: Router,
    private _remoteService: StRemoteDataService,
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _premiumService: PremiumService,
    private _routerExtension: RouterExtensionService
  ) {}

  /**
   * Implements OnInit
   */
  public ngOnInit(): void {
    this._listenToRouteChanges();
    this._route.params.subscribe(params => {
      this._targetId = params.userId;
      // Get allowed time from remote in seconds
      this._currentUserId = this._remoteService.getUserValue('id');
      this._remoteService.getPronoTimeRemaining(this._currentUserId)
        .subscribe((data: any) => {
          if(data.remaining_time <= 0) {
            this._router.navigate(['/group/my-active']);
          }
          this._allowedTime = data.remaining_time;
          this._currentTime = data.remaining_time;
          if (this._premiumService.shouldPay()) {
            this.start();
          }
        });
    });
  }

  /**
   * Start the timer
   */
  public start(): void {
    if (this._currentUserId && this._targetId) {
      this._http.post(URL + '/timer/start/' + this._currentUserId + '/' + this._targetId, [])
        .subscribe((data: any) => {
          this._isActive = true;
          this.showTimer = true;
          this._timerId = data.timer_id;
          // Create a timer for each seconds
          const timer = TimerObservable.create(0, 1000);
          this._subscription = timer.subscribe(t => {
            this._currentTime = this._allowedTime - t;
            this.minutes = Math.floor(this._currentTime / 60);
            this.seconds = this._currentTime - (this.minutes * 60);
            if (this._currentTime <= 0) {
              this.end();
            }
          });
        });
    }
  }

  /**
   * Listen to route change to prevent user from
   * leaving page after 4 minutes and not ending
   * the timer.
   * @private
   */
  private _listenToRouteChanges(): void {
    this._routerSubscription = this._router.events.subscribe(data => {
      if (this._isActive === true) {
        this.end(true);
      }
    });
  }

  /**
   * End the timer
   *
   * @param {boolean} fromRouteChange
   */
  public end(fromRouteChange = false): void {
    this._subscription.unsubscribe();
    if (this._currentUserId && this._timerId) {
      this._http.post(URL + '/timer/end/' + this._currentUserId + '/' + this._timerId, [])
        .subscribe((data: any) => {
          this._isActive = false;
          this._routerSubscription.unsubscribe();
          let previousUrl = this._routerExtension.getPreviousUrl();
          if(!previousUrl) {
            previousUrl = '/group/my-active';
          }
          // Return to contest page
          if (!fromRouteChange) {
            this._router.navigate([previousUrl]);
          }
        });
    }
  }

  /**
   * Pad a number to add a 0 on front
   * @param {Number} time
   * @returns {string}
   */
  public pad(time: Number): string {
    let timeString = time + '';
    while (timeString.length < 2) {
      timeString = '0' + timeString;
    }
    return timeString;
  }
}