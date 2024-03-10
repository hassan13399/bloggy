import { Component, OnInit } from '@angular/core';
import { StRemoteDataService } from '../st-forms/st-remote-data.service';
import { StMessageService } from '../st-forms/st-message.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isAuthenticated = false;
  constructor(private remoteService: StRemoteDataService, private msg: StMessageService) {
    this.isAuthenticated = this.remoteService.isAuthenticated();

    this.msg.getMessage('signinOK').subscribe(text => {
      this.isAuthenticated = this.remoteService.isAuthenticated();
    });
  }

  ngOnInit() {
  }

}
