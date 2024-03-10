import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StRemoteDataService } from '../../st-forms/st-remote-data.service';
import { StFormComponent } from '../../st-forms/st-form/st-form.component';
import { StFormService } from '../../st-forms/st-form.service';
import { DynamicFormService, DynamicFormLayout } from '@ng-dynamic-forms/core';
import { StMessageService } from '../../st-forms/st-message.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';


// for authentication request
const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'jwt';
const TOKEN_NAME = 'jwtToken';

@Component({
  selector: 'app-st-create-user',
  templateUrl: './st-create-user.component.html',
  styleUrls: ['./st-create-user.component.scss']
})

export class StCreateUserComponent implements OnInit {

  jsonModel = 'st-user-create-user';
  // formLayout: DynamicFormLayout = ST_FORM_LAYOUT;
  formGroup;
  formModel;
  token;
  isAuthenticated = false; // edit or create
  data; // for test on date time
  hideForm = false;
  @ViewChild(StFormComponent) stFormComponent;

  constructor(protected http: HttpClient, protected formService: DynamicFormService, private stFormService: StFormService,
              private remoteService: StRemoteDataService, private msg: StMessageService, private router: Router) { }

  ngOnInit() {
    this.token = localStorage.getItem(TOKEN_NAME);
    // load model for formGroup
    const json = '../../../../assets/' + this.jsonModel + '.json';
    this.http.get<object[]>(json)
      .subscribe(formModelJson => {
        this.formModel = this.stFormService.fromJSON(formModelJson);
      });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  create() {
    this.validateAllFormFields(this.formGroup);
    if (this.formGroup.valid) {
      const values = {};
      Object.assign(values, this.stFormComponent.formGroup.value);

      if (localStorage.getItem('source')) {
        values['source'] = localStorage.getItem('source');
      }

      this.remoteService.createUser(values).subscribe(data => {
        if (data['email']) {
          this.hideForm = true;
        }
        //this.msg.sendFlash('success', 'signup ok');
        // this.router.navigate([environment.afterSignup]);
      }, err => {
        // this.message = err.error.msg;
      });
    } else {
      this.msg.sendMessage('feedback', 'danger', 'FORM_ERROR.form_errors');
    }

    window.scrollTo(0, 0);
  }

  update() {
    this.validateAllFormFields(this.formGroup);

    if (this.formGroup.valid) {
      const values = {};
      Object.assign(values, this.stFormComponent.formGroup.value);

      this.remoteService.updateUser(values).subscribe(data => {
        data['password'] = '';
        data['password_repeat'] = '';

        this.remoteService.storeUserInfo(data);

        this.router.navigate([environment.afterSignup]);
        this.msg.sendFlash('success', 'USER.signin ok');

      }, err => {
        const data = {};
        data['password'] = '';
        data['password_repeat'] = '';
      });
    } else {
      this.msg.sendMessage('feedback', 'danger', 'FORM_ERROR.form_errors');
    }

    window.scrollTo(0, 0);
  }

  fbConnect() {
    this.remoteService.fbConnect().then(data => {
      if (data['new']) {
        this.router.navigate([environment.afterFbSignup]);
        this.msg.sendFlash('success', 'USER.complete_profile');
      } else {
        this.router.navigate([environment.afterSignin]);
        this.msg.sendFlash('success', 'USER.signin ok');
      }
    });
  }

  afterSave($event) {
    // console.log($event);
  }

  onFormInit(event) {
    this.formGroup = event.formGroup;

    if (this.remoteService.isAuthenticated()) {
      this.isAuthenticated = true;
      this.remoteService.loadProfile().subscribe(data => {
        this.data = data;
        this.stFormComponent.setValue(data);
        this.formGroup.get('email').disable();
      });
    }
  }
}