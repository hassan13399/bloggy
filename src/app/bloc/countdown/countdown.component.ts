import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { StRemoteDataService } from '../../st-forms/st-remote-data.service';
import { timer } from 'rxjs/observable/timer';
import * as moment from 'moment';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy  {

  nextDate;
  day;
  hour;
  min;
  sec;
  @Input() displayType = 'default';
  subscription;

  constructor(private remoteService: StRemoteDataService) {}

  ngOnInit() {
    const nowTs = parseInt(moment().utc().local().format('X'), 10);
    this.remoteService.getNextPronoDefDate().subscribe(data => {
      this.nextDate = data['nextPronoDefDate'];

      if(this.nextDate) {
        const nextTs = parseInt(moment(this.nextDate).utc().local().format('X'), 10);
        const diff = nextTs - nowTs;

        this.subscription = timer(0, 1000).subscribe(val => {
          let remainder: number;

          this.day = Math.floor((diff - val) / 86400);
          remainder = (diff - val) % 86400;
          this.hour = Math.floor(remainder / 3600);
          remainder = remainder % 3600;
          this.min = Math.floor(remainder / 60);
          remainder = remainder % 60;
          this.sec = remainder;
        });
      } else {
        this.day = 0;
        this.hour = 0;
        this.min = 0;
        this.sec = 0;
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}