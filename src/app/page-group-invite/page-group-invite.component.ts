import { Component, OnInit } from '@angular/core';
import { StRemoteDataService } from '../st-forms/st-remote-data.service';
import { FormBuilder } from '@angular/forms';
import { StMessageService } from '../st-forms/st-message.service';

@Component({
  selector: 'app-page-group-invite',
  templateUrl: './page-group-invite.component.html',
  styleUrls: ['./page-group-invite.component.scss']
})
export class PageGroupInviteComponent implements OnInit {

  jsonModel = 'group-join-form';
  formGroup;
  groups;
  hasGroup;

  constructor(private remoteService: StRemoteDataService, private fb: FormBuilder,
      private msg: StMessageService) {
    this.formGroup = this.fb.group({
      group: ''
    });
  }

  ngOnInit() {
    // groupMy

      this.remoteService.groupMy().subscribe(data => {
      // this.remoteService.groupMyAsCaptain().subscribe(data => {
      this.groups = data;

      if (this.groups && this.groups.length) {
        // the user belongs to at least one group
        // this.groupId = this.groups[0].value;
        this.hasGroup = true;
        // this.setSelectValue(this.groupId);
      } else {
        // no group for the user
        this.hasGroup = false;
      }
    }, err => {
      // console.log('PageGroupCreateComponent: ', err);
    });

  }

  sendInvitation() {
    const groupId = this.formGroup.value['group'];
    this.remoteService.groupSendInvitation(groupId).subscribe(data => {
      // console.log(data);
      this.msg.sendMessage('invitation', 'success', 'LABEL.__Invitation_sent');
    }, err => {
      //console.log('PageGroupCreateComponent: ', err);
    });
  }
}
