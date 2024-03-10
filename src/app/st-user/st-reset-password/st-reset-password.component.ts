import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { StRemoteDataService } from '../../st-forms/st-remote-data.service';
import { StMessageService } from '../../st-forms/st-message.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'st-reset-password',
  templateUrl: './st-reset-password.component.html',
  styleUrls: ['./st-reset-password.component.scss']
})
export class StResetPasswordComponent implements OnInit {

  jsonModel = 'st-user-reset-password-form';
  formGroup;
  code;
  @Output('stAfterResetPassword') stAfterResetPassword = new EventEmitter();

  constructor(private remoteService: StRemoteDataService, private router: Router,
              private msg: StMessageService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onFormInit($event) {
    this.formGroup = $event.formGroup;
  }

  resetPassword() {

    this.route.params.subscribe(params => {

      this.code = params['code']; // + means transform in integere

      const values = {};
      Object.assign(values, {code: this.code}, this.formGroup.value);

      this.remoteService.resetPassword(values).subscribe(data => {
        this.remoteService.setToken(data['token']);
        this.remoteService.storeUserInfo(data['user']);
        this.msg.sendFlash('success', 'USER.password reset ok');
        this.router.navigate([environment.afterSignup]);
      }, err => {
        console.log('error signin:', err);
      });

    });
  }
}
