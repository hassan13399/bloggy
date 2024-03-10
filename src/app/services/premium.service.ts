import {StRemoteDataService} from '../st-forms/st-remote-data.service';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class PremiumService {

  /**
   * Constructor
   * @param {StRemoteDataService} _remoteService
   */
  public constructor(
    private _remoteService: StRemoteDataService
  ) {}

  /**
   * If user should pay. This finds out if premium
   * has started and if user is premium
   * @returns {boolean}
   */
  public shouldPay(): boolean {
    return this.hasStarted() && !this.isUserPremium();
  }

  /**
   * If premium has Started
   * @returns {boolean}
   */
  public hasStarted(): boolean {
    const startDate = moment(environment.payment_start);
    const now = moment();
    return startDate.isSameOrBefore(now);
  }

  /**
   * If user is premium
   * @returns {boolean}
   */
  public isUserPremium(): boolean {
    return this._remoteService.getUserValue('is_premium');
  }

  /**
   * If contest has started (first match has ended)
   * @returns {boolean}
   */
  public contestHasStarted(): boolean {
    const startDate = moment(environment.competition_start);
    const now = moment();
    const duration = moment.duration(now.diff(startDate));
    return duration.asHours() >= 1.5;
  }
}
