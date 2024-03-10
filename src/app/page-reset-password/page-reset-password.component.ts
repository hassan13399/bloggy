import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StRemoteDataService } from '../st-forms/st-remote-data.service';
import { StFormComponent } from '../st-forms/st-form/st-form.component';
import { StFormService } from '../st-forms/st-form.service';
import { DynamicFormService } from '@ng-dynamic-forms/core';

@Component({
  selector: 'app-page-reset-password',
  templateUrl: './page-reset-password.component.html',
  styleUrls: ['./page-reset-password.component.scss']
})
export class PageResetPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}