import { Component, OnInit } from '@angular/core';
import { StRemoteDataService } from '../../st-forms/st-remote-data.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { StMessageService } from '../../st-forms/st-message.service';


@Component({
  selector: 'app-st-register-confirm',
  templateUrl: './st-register-confirm.component.html',
  styleUrls: ['./st-register-confirm.component.scss']
})
export class StRegisterConfirmComponent implements OnInit {

  code;
  constructor(private route: ActivatedRoute, private remoteService: StRemoteDataService,
              private msg: StMessageService, private router: Router) {
    this.route.params.subscribe(params => {
      if (params) {
        this.code = params['code']; //
        if (this.code) {
          this.remoteService.confirmUser(this.code).subscribe(data => {
            this.remoteService.setToken(data['token']);
            this.remoteService.storeUserInfo(data['user']);
            this.msg.sendFlash('success', 'USER.afterSignupConfirmation');
            this.router.navigate([environment.afterSignup]);
          });
        }
      }
    });
  }

  ngOnInit() {
  }

}
