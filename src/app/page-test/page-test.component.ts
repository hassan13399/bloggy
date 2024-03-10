import { Component, OnInit } from '@angular/core';
import { StRemoteDataService } from '../st-forms/st-remote-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-test',
  templateUrl: './page-test.component.html',
  styleUrls: ['./page-test.component.scss']
})
export class PageTestComponent implements OnInit {

  data;
  constructor(private remoteService: StRemoteDataService) {
    /*
    const inputData = {};

    this.remoteService.test(inputData).subscribe(data => {
      this.data = data;
    });
    */
  }

  ngOnInit() {
  }

  sendMail() {
    this.remoteService.sendMail().subscribe(data => {
      this.data = data;
    });
  }

  test() {
    this.remoteService.test({}).subscribe(data => {
      this.data = data;
    });
  }

  getFirstPronoDefOfToday() {
    this.remoteService.getFirstPronoDefOfToday().subscribe( data => {
      this.data = data;
    });
    // console.log(this.data);
  }

  getNextPronoDefDate() {
    this.remoteService.getNextPronoDefDate().subscribe( data => {
      this.data = data;
    });
    // console.log(this.data);
  }

  getMyRankings() {
    this.remoteService.getMyRankings().subscribe( data => {
      this.data = data;
    });
    // console.log(this.data);
  }

}
