import { Component, OnInit, ViewChild } from '@angular/core';
import { StRemoteDataService } from '../st-forms/st-remote-data.service';
import { StFormComponent } from '../st-forms/st-form/st-form.component';
import { DynamicFormService } from '@ng-dynamic-forms/core';
import { Router } from '@angular/router';
import { StMessageService } from '../st-forms/st-message.service';

@Component({
  selector: 'app-page-group-join',
  templateUrl: './page-group-join.component.html',
  styleUrls: ['./page-group-join.component.scss']
})
export class PageGroupJoinComponent implements OnInit {

  jsonModel = 'group-join-form';
  formGroup;
  @ViewChild(StFormComponent) stFormComponent;

  constructor(protected formService: DynamicFormService, private remoteService: StRemoteDataService,
    private msg: StMessageService, private router: Router) { }

  ngOnInit() {
  }

  onFormInit(event) {
    this.formGroup = event.formGroup;
  }

  join() {
    if (this.formGroup.value.group) {

      const values = {
        id: this.formGroup.value.group,
        password: this.formGroup.value.password
      };

      // console.log('values', values);
      this.remoteService.groupJoin(values).subscribe(resp => {
        // console.log('PageGroupJoinComponent: ', resp);
        if (resp['id']) {
          this.msg.sendFlash('success', 'group_joined_ok');
          this.router.navigate(['/group/my-active']);
        }
      }, err => {
        // this.message = err.error.msg;
        // console.log('PageGroupCreateComponent: ', err);
      });
    }

    return true;
  }
}
