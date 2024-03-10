import { Component, OnInit } from '@angular/core';
import { StRemoteDataService } from '../../st-forms/st-remote-data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-st-logout',
  templateUrl: './st-logout.component.html',
  styleUrls: ['./st-logout.component.scss']
})
export class StLogoutComponent implements OnInit {

  constructor(private remoteService: StRemoteDataService, private router: Router) {
    this.remoteService.logout();
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

}
