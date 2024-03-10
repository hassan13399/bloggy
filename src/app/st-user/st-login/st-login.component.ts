import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StRemoteDataService } from '../../st-forms/st-remote-data.service';
import { FacebookService, InitParams } from 'ngx-facebook';
import { StMessageService } from '../../st-forms/st-message.service';

// for authentication request
const AUTH_PREFIX = 'jwt';
const TOKEN_NAME = 'jwtToken';

@Component({
  selector: 'st-login',
  templateUrl: './st-login.component.html',
  styleUrls: ['./st-login.component.scss']
})

export class StLoginComponent implements OnInit {

  jsonLoginModel = 'st-user-login-form';
  jsonForgotModel = 'st-user-forgot-form';
  loginFormGroup;
  forgotFormGroup;
  data;
  token;
  message;
  display = 'login';
  @Output('stAfterLogin') stAfterLogin = new EventEmitter();
  @Output('stAfterForgotPassword') stAfterForgotPassword = new EventEmitter();
  @Output('stAfterCreateAccount') stAfterCreateAccount = new EventEmitter();

  constructor(private remoteService: StRemoteDataService, private msg: StMessageService, private fb: FacebookService) {}

  ngOnInit() {
    this.token = localStorage.getItem(TOKEN_NAME);
  }

  login() {
    this.remoteService.signin(this.loginFormGroup.value).subscribe(resp => {
      // console.log('data after signin', this.data.user);
      // console.log('userInfo after signin:', this.remoteService.getUserInfo());

      this.data = resp;
      this.remoteService.setToken(this.data.token);
      this.remoteService.storeUserInfo(this.data.user);
      this.stAfterLogin.emit({status: 'OK'});
      this.msg.sendFlash('success', 'USER.signin ok');
      this.msg.sendMessage('signinOK', 'success', 'true');
    }, err => {
      //this.message = err.statusText
    });
    return true;
  }

  createAccount() {
    this.stAfterCreateAccount.emit({status: 'OK'});
  }

  onFormInit(event) {
    // improve by adding viewchild on st-login component and access it directly
    if (event.context.jsonModel === 'st-user-login-form') {
      this.loginFormGroup = event.formGroup;
    } else {
      this.forgotFormGroup = event.formGroup;
    }
  }

  show(display) {
    this.display = display;
  }

  resetCodePassword() {
    this.remoteService.createResetCode(this.forgotFormGroup.value).subscribe(data => {
      this.display = 'afterForgot';
      this.stAfterForgotPassword.emit({status: 'OK'});
    }, err => {
      // console.log('error signin:', err);
    });
  }
}