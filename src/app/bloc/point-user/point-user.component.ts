import { Component, OnInit } from '@angular/core';
import { StRemoteDataService } from '../../st-forms/st-remote-data.service';


@Component({
  selector: 'app-point-user',
  templateUrl: './point-user.component.html',
  styleUrls: ['./point-user.component.scss']
})
export class PointUserComponent implements OnInit {

  dayRankings;
  generalRanking;
  constructor(private remoteService: StRemoteDataService) { }

  ngOnInit() {
    this.remoteService.getMyRankings().subscribe(data => {
      // this.general = this.rankings[]
      // console.log(data);
      // phaseRankings
      // dayRankings
      this.dayRankings = data['dayRankings'];
      data['phaseRankings'].forEach(item => {
        // console.log(item);
        if (item['phase'] && item['phase']['label'] === 'general') {
          this.generalRanking = item;
        }
      });
      // console.log('generalRanking', this.generalRanking);
    });
  }

}
