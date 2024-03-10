import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StRemoteDataService } from '../st-forms/st-remote-data.service';
import { StMessageService } from '../st-forms/st-message.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private remoteService: StRemoteDataService,
              private msg: StMessageService) { }

  isAuthenticated;
  ngOnInit() {
    this.isAuthenticated = this.remoteService.isAuthenticated();

    const redirectAction = localStorage.getItem('redirectAction');
    const redirectData = localStorage.getItem('redirectData');

    localStorage.setItem('redirectAction', '');
    localStorage.setItem('redirectData', '');

    if (redirectAction && redirectData) {
      switch (redirectAction) {
        case 'reset':
          this.router.navigate(['userResetPassword/' + redirectData]);
          break;
        case 'confirmation':
          this.router.navigate(['user/confirm/' + redirectData]);
          break;
      }
    }

    this.route.data.subscribe(data => {
      // set the source web site (for partner)
      if (data && data['source']) {
        localStorage.setItem('source', data['source']);
        this.msg.sendMessage('bodyClass', 'sudinfo', 'sudinfo');
      }
      // In a real app: dispatch action to load the details here.
    });
  }

  openLogin() {
    this.msg.sendMessage('modalLogin', 'open', '');
  }
}
