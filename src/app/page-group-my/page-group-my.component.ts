import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { StRemoteDataService } from '../st-forms/st-remote-data.service';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PremiumService} from '../services/premium.service';

const URL = environment.remoteUrl;

@Component({
  selector: 'app-page-group-my',
  templateUrl: './page-group-my.component.html',
  styleUrls: ['./page-group-my.component.scss']
})
export class PageGroupMyComponent implements OnInit {

  formGroup;
  groups;
  users;
  group; // active group
  groupId = null;
  captainId = 0; // id of the captain of the active group
  userId;
  groupLabel = '';
  hasGroup = false; // true if users belongs to at least one Group
  isAuthenticated;
  userPhoto;
  hideDescription = true;
  isoCountry;

  /**
   * @type {number}
   */
  public selectedUser: number;

  /**
   * @type {NgbModalRef}
   * @private
   */
  private _modal: NgbModalRef;

  /**
   * @type {ElementRef}
   */
  @ViewChild('deleteModal') deleteModal: ElementRef;

  /**
   * @type {ElementRef}
   */
  @ViewChild('leaveModal') leaveModal: ElementRef;

  /**
   * @type {ElementRef}
   */
  @ViewChild('kickModal') kickModal: ElementRef;

  /**
   * Bootstrap modal to display if user is not
   * premium
   * @type {ElementRef}
   */
  @ViewChild('content') content: ElementRef;

  /**
   * @type {boolean}
   */
  readonly _isPremium: boolean;

  /**
   * @type {number}
   */
  public remainingTime: number;

  constructor(
    private remoteService: StRemoteDataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _router: Router,
    private _modalService: NgbModal,
    private _http: HttpClient,
    private _premiumService: PremiumService
  ) {
    this.formGroup = this.fb.group({
      group: ''
    });
    this.formGroup.valueChanges.subscribe(val => {
      this.hideDescription = true;
      this.groupId = val.group;

      this.groups.forEach(function(group) {
        if (group.value === this.groupId) {
          this.groupLabel = group.label;
        };
      }, this);

      this.loadUsers();
    });

    this.isAuthenticated = this.remoteService.isAuthenticated();
    if (this.isAuthenticated) {
      const userInfo = this.remoteService.getUserInfo();
      this._isPremium = !this._premiumService.shouldPay();
      if (!this._isPremium) {
        this.remoteService.getPronoTimeRemaining(userInfo.id)
          .subscribe((data: any) => {
            if (data.status === 'OK') {
              this.remainingTime = data.remaining_time;
            }
          });
      }
      this.userId = userInfo.id;
      if (userInfo['photo']) {
        this.userPhoto = this.remoteService.getImagePath(userInfo['photo']);
      }
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params) {
        this.groupId = +params['id']; // + means transform in integer
      }
    });

    this._loadGroups();
  }

  setSelectValue(value) {
    this.formGroup.setValue({group: value});
  }

  loadUsers() {
    this.remoteService.groupUsers(this.groupId).subscribe(data => {
      this.users = data;
      // we get captain info from this request
      if (this.users && data[0].groups[0]) {
        this.captainId = data[0].groups[0]['captain_id'];
        this.group = data[0].groups[0];
      }
    }, err => {
      // console.log('PageGroupCreateComponent: ', err);
    });
  }

  private _loadGroups(fromDeletion: boolean = false): void {
    this.remoteService.groupMy().subscribe(data => {
      this.groups = data;
      if ((!this.groupId || fromDeletion === true) && this.groups && this.groups.length) {
        // the user belongs to at least one group
        this.groupId = this.groups[0].value;
        this.hasGroup = true;
        this.setSelectValue(this.groupId);
      } else {
        // no group for the user
        this.hasGroup = false;
      }
    }, err => {
      // console.log('PageGroupCreateComponent: ', err);
    });
  }

  setHideDescription(value) {
    this.hideDescription = value;
  }

  /**
   * Go to prono or open modal to indicate time left
   * @param {number} id
   * @param {boolean} skip
   */
  public goToProno(id: number, skip = false): void {
    this.selectedUser = id;
    if (!this._isPremium && skip === false && id !== this.userId) {
      this._modal = this._modalService.open(this.content);
    } else {
      if (this._modal) {
        this._modal.close();
      }
      this._router.navigate(['/prono/' + id]);
    }

  }

  public formatTimer(time: number) : string {
    const minutes = Math.floor(time / 60);
    const seconds = time - (minutes * 60);
    return this.pad(minutes) + 'm' + this.pad(seconds) + 's';
  }

  /**
   * Pad a number to add a 0 on front
   * @param {Number} time
   * @returns {string}
   */
  public pad(time: Number): string {
    let timeString = time + '';
    while (timeString.length < 2) {
      timeString = '0' + timeString;
    }
    return timeString;
  }

  public openDeleteModal() {
    this._modal = this._modalService.open(this.deleteModal);
  }

  public openLeaveModal() {
    this._modal = this._modalService.open(this.leaveModal);
  }

  public openKickModal(uid: number) {
    this.selectedUser = uid;
    this._modal = this._modalService.open(this.kickModal);
  }

  public kickUserFromGroup() {
    this.remoteService.kickUserFromGroup(this.groupId, this.selectedUser).subscribe((data: any) => {
      for(const key in this.users) {
        const user = this.users[key];
        if(user.id === this.selectedUser) {
          this.users.splice(key, 1);
        }
      }
      this._modal.close();
    });
  }

  public deleteGroup() {
    this.remoteService
      .deleteGroup(this.groupId)
      .subscribe(data => {
        this._loadGroups(true);
        this._modal.close();
      });
  }

  public leaveGroup() {
    this.remoteService
      .leaveGroup(this.groupId)
      .subscribe(data => {
        this._loadGroups(true);
        this._modal.close();
      });
  }
}