import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StRemoteDataService} from '../../st-forms/st-remote-data.service';
import {PremiumService} from '../../services/premium.service';

@Component({
  selector: 'app-day-menu',
  templateUrl: './day-menu.component.html',
  styleUrls: ['./day-menu.component.scss']
})
export class DayMenuComponent implements OnInit {

  @Input() menu;
  @Input() activeDay;
  @Input() userPseudo;
  public userIsOwner = false;

  public isPremium: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _remoteService: StRemoteDataService,
    private _premiumService: PremiumService
  ) {
  }

  ngOnInit() {
    this.isPremium = !this._premiumService.shouldPay();
    this._route.params.subscribe(data => {
        const userId = parseInt(data.userId);
        const currentUserId = parseInt(this._remoteService.getUserValue('id'));
        if(isNaN(userId) || userId === currentUserId) {
          this.userIsOwner = true;
        }
        console.log(this.userIsOwner);
    });
  }

  setActive(value) {
    this.activeDay.next(value);
  }

}
