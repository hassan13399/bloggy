import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { StRemoteDataService } from '../st-forms/st-remote-data.service';
import { StFormComponent } from '../st-forms/st-form/st-form.component';
import { DynamicFormService } from '@ng-dynamic-forms/core';
import { StMessageService } from '../st-forms/st-message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-group-create',
  templateUrl: './page-group-create.component.html',
  styleUrls: ['./page-group-create.component.scss']
})
export class PageGroupCreateComponent implements OnInit {

  jsonModel = 'page-group-create';
  formGroup;
  groupId;
  data;
  @ViewChild(StFormComponent) stFormComponent;
  constructor(protected formService: DynamicFormService, private remoteService: StRemoteDataService,
              private router: Router, private route: ActivatedRoute, private  msg: StMessageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params) {
        this.groupId = +params['id']; // + means transform in integer
      }
    });
  }

  onFormInit(event) {
    this.formGroup = event.formGroup;

    if (this.groupId) {
      this.remoteService.loadGroup(this.groupId).subscribe(data => {
        this.data = data;
        data['password'] = '';
        data['password_repeat'] = '';
        this.stFormComponent.setValue(data);
        this.formGroup.get('email').disable();
      });
    }
  }

  submit() {
    if(this.groupId) {
      this.modify();
    } else {
      this.create();
    }
  }

  modify() {
    const values = {};
    // needed for file upload!
    Object.assign(values, this.stFormComponent.formGroup.value, this.stFormComponent.overrideValues);

    this.remoteService.modifyGroup(this.groupId, values).subscribe(resp => {
      this.msg.sendFlash('success', 'competition modification ok');
      this.router.navigate(['/group/my-active']);
    }, err => {
      // this.message = err.error.msg;
      // console.log('PageGroupCreateComponent: ', err);
    });
    return true;
  }

  create() {
    const values = {};
    // needed for file upload!
    Object.assign(values, this.stFormComponent.formGroup.value, this.stFormComponent.overrideValues);

    this.remoteService.createGroup(values).subscribe(resp => {
      this.msg.sendFlash('success', 'competition creation ok');
      this.router.navigate(['/group/my-active']);
    }, err => {
      // this.message = err.error.msg;
      // console.log('PageGroupCreateComponent: ', err);
    });
    return true;
  }
}
