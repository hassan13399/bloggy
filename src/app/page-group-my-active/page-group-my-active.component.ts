import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { StRemoteDataService } from '../st-forms/st-remote-data.service';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {PremiumService} from '../services/premium.service';
import {TranslateService} from '@ngx-translate/core';
import * as moment from "moment";

@Component({
  selector: 'app-page-group-my-active',
  templateUrl: './page-group-my-active.component.html',
  styleUrls: ['./page-group-my-active.component.scss']
})
export class PageGroupMyActiveComponent implements OnInit, OnDestroy {

  formGroup;
  groups;
  group; // active group
  groupId = null;
  captainId = 0; // id of the captain of the active group
  userId;
  groupLabel = '';
  hasGroup = false; // true if users belongs to at least one Group
  isAuthenticated;
  // userPhoto;
  hideDescription = true;

  prefix = 'rankingGroupStorage';
  // tabsL1= {
  //   'composition': 'composition',
  //   'ranking': 'ranking'
  // };
  //
  // initialTabsL1 = this.tabsL1;

  tabsL2 = {
    'phase1': ['day1', 'day2', 'day3'],
    'phase2': ['day4', 'day5', 'day6', 'day7', 'day8'],
    'general': []
  };

  users; // contain data for the ranking
  rankings;
  hasRanking = false;
  showMove = false;
  podium; // 3 first of the ranking

  tabL1Menu;
  activeL1Menu: Subject<any> = new Subject();
  activeL1MenuValue;
  tabL2Menu;
  activeL2Menu: Subject<any> = new Subject();
  activeL2MenuValue;
  tabL3Menu;
  activeL3Menu: Subject<any> = new Subject();
  activeL3MenuValue;

  groupMove = [];

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
   * @type {number}
   */
  public selectedUser: number;

  /**
   * Bootstrap modal to display if user is not
   * premium
   * @type {ElementRef}
   */
  @ViewChild('content') content: ElementRef;

  /**
   * @type {ElementRef}
   */
  @ViewChild('NotAllowed') notAllowed: ElementRef;

  /**
   * @type {boolean}
   */
  private _isPremium: boolean;

  /**
   * @type {number}
   */
  public remainingTime: number;

  public firstGroupId: number;

  public isRanking: boolean = false;

  public isAllowed: boolean = true;

  /**
   * The current locale
   * @type {string}
   */
  public currentLocale = 'en';

  public currentImageSrc: string;

  public currentTimerImageSrc: string;
  public currentRankingImageSrc: string;

  public hasAccess: boolean;

  constructor(
    private remoteService: StRemoteDataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _modalService: NgbModal,
    private _premiumService: PremiumService,
    private _router: Router,
    private _translate: TranslateService
  ) {
    this.currentLocale = this._translate.currentLang;
    this.currentImageSrc = '/assets/img/pro_all_group_' + this.currentLocale + '.png';
    this.currentRankingImageSrc = '/assets/img/pro_ranking_' + this.currentLocale + '.png';
    this.currentTimerImageSrc = '/assets/img/pro_illimited_consultation_' + this.currentLocale + '.png';
    this._translate.onLangChange.subscribe(event => {
      this.currentImageSrc = '/assets/img/pro_all_group_' + event.lang + '.png';
      this.currentTimerImageSrc = '/assets/img/pro_illimited_consultation_' + event.lang + '.png';
      this.currentRankingImageSrc = '/assets/img/pro_ranking_' + event.lang + '.png';
    });
    this.remoteService.getFirstPronoDefOfToday().subscribe((data:any) => {
      if (data.firstPronoDefOfToday && this._premiumService.shouldPay()) {
        const start = moment(data.firstPronoDefOfToday);
        const now = moment();
        if (now.isAfter(start) && parseInt(now.format('HH')) < 23) {
          this.hasAccess = false;
        } else {
          this.hasAccess = true;
        }
      } else {
        this.hasAccess = true;
      }
      this.remoteService.getUserFirstGroup().subscribe((data: any) => {
        this.firstGroupId = data.group.group_id;
        this.formGroup = this.fb.group({
          group: ''
        });

        this._loadGroups();
        if (this._premiumService.contestHasStarted()) {
          this.isRanking = true;
          this.activeL2MenuValue = Object.keys(this.tabsL2)[0];
        } else {
          this.isRanking = false;
          this.activeL2MenuValue = null;
        }

        this.formGroup.valueChanges.subscribe(val => {
          // this.activeL1Menu.next(Object.keys(this.tabsL1)[0]);
          this.hideDescription = true;
          this.groupId = val.group;
          this.isAllowed = this.groupId === this.firstGroupId || !this._premiumService.shouldPay();
          this.groups.forEach(function(group) {
            if (group.value === this.groupId) {
              this.captainId = group.captain_id;
              this.groupLabel = group.label;
              this.group = group;
            }
          }, this);

          if (this._premiumService.contestHasStarted()
            && this.activeL2MenuValue
            && this.isAllowed
          ) {
            const tabsL2 = this.tabsL2[this.activeL2MenuValue];
            if (tabsL2.length) {
              this.activeL3MenuValue = tabsL2[0];
              this.getRanking(this.activeL3MenuValue);
            } else {
              this.getRanking(this.activeL2MenuValue);
            }
          }
          else if (this._premiumService.contestHasStarted()
            && this.activeL2MenuValue
            && !this.isAllowed
          ) {
            // Do nothing for now
          } else {
            this.loadUsers();
          }
        });

        this.route.params.subscribe(params => {
          if (params) {
            this.groupId = +params['id']; // + means transform in integer
          }
        });

        const userInfo = this.remoteService.getUserInfo();
        this.userId = userInfo.id;
        this._isPremium = !this._premiumService.shouldPay();
        if (!this._isPremium) {
          this.remoteService.getPronoTimeRemaining(this.userId)
            .subscribe((data: any) => {
              if (data.status === 'OK') {
                this.remainingTime = data.remaining_time;
              }
            });
        }
      });
    });

  }

  ngOnInit() {
  }

  setSelectValue(value) {
    this.formGroup.setValue({group: value});
  }

  saveValue(key, value) {
    localStorage.setItem(this.prefix + key, value);
  }

  getValue(key) {
    return localStorage.getItem(this.prefix + key);
  }

  loadUsers() {
    if (this.hasAccess && this.isAllowed) {
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

  }

  getRanking(menuValue) {
    if (this.hasAccess && this.isAllowed) {
      if (this.isDay(menuValue)) {
        this.remoteService.getDayMyGroupRanking(this.groupId, menuValue).subscribe(data => {
          this.updateUserAndPodium(data);
        }, err => {
          console.log('getDayIndividualRanking: ', err);
        });
      } else {
        this.remoteService.getPhaseMyGroupRanking(this.groupId, menuValue).subscribe(data => {

          let item = {};
          // for backward compatibility when previous was not present
          if (data['current']) {
            this.groupMove = [];
            // calculate move
            if (data['previous'] && data['previous'].length) {
              const previousRank = {};
              let i = 0;
              data['previous'].forEach(function(element) {
                previousRank[element['id']] = i++;
              });

              i = 0;
              data['current'].forEach(function(element) {
                let pos;
                if (previousRank[element['id']] != null) {
                  pos = previousRank[element['id']] - i;
                } else {
                  pos = 0;
                }
                /*
                item = {
                  previousPos: previousRank[element['id']],
                  actualPos: i,
                  currentElement: element,
                  previousElement: data['previous'][previousRank[element['id']]],
                  move: pos
                };
                */
                i++;
                this.groupMove.push( pos );
              }, this);
            }
            this.updateUserAndPodium(data['current']);

          // for backward compatibility when previous was not present
          // could be remove
          } else {
            this.updateUserAndPodium(data);
          }

        }, err => {
          console.log('getPhaseIndividualRanking: ', err);
        });
      }
    }
  }

  protected updateUserAndPodium(data) {
    if (data === 'no_ranking') {
      this.rankings = [];
      this.podium = [];
      this.hasRanking = false;
    } else {
      this.rankings = data;
      this.hasRanking = true;
      this.updatePodium();
    }
  }

  protected isDay(label) {
    const str = label.substring(0, 3);
    const res = (label === 'prologue' || str === 'day');

    return res;
  }

  protected updatePodium() {
    this.podium = [];
    for(let i = 0; i < 3; i++) {
      if (this.rankings[i]) {
        let points = 0;
        if (this.rankings[i].rankings[0].points) {
          points = this.rankings[i].rankings[0].points;
        }
        this.podium[i] = {
          name: this.rankings[i].pseudo,
          photo: this.rankings[i].photo,
          points: points
        }
      }
    }
  }

  protected generateMenu(valueArray, activeValue) {
    const menu = [];
    Object.values(valueArray).map(function(key, index) {
      const classMenu = (key === activeValue) ? 'active' : '';
      menu.push({
        value: key,
        class: classMenu
      });
    }, this);
    return menu;
  }

  private _loadGroups(fromDeletion: boolean = false) {
    let defaultValue;
    this.remoteService.groupMy().subscribe(data => {
      this.groups = data;
      if ((!this.groupId || fromDeletion === true) && this.groups && this.groups.length) {
        // the user belongs to at least one group
        this.groupId = this.groups[0].value;
        this.hasGroup = true;
        this.setSelectValue(this.groupId);
        if (this._premiumService.contestHasStarted()
          && this.activeL2MenuValue
          && this.isAllowed
        ) {
          this.activeL2Menu.subscribe(value => {
            this.tabL2Menu = this.generateMenu(Object.keys(this.tabsL2), value);
            this.activeL2MenuValue = value;
            this.saveValue('activeL2Menu', value);

            // show move only for general ranking
            this.showMove = (this.activeL2MenuValue === 'general');

            if (this.tabsL2[value].length) {
              this.activeL3Menu.next(this.tabsL2[value][0]);
            } else {
              this.getRanking(this.activeL2MenuValue);
              this.tabL3Menu = [];
            }
          });

          this.activeL3Menu.subscribe(value => {
            this.activeL3MenuValue = value;
            this.tabL3Menu = this.generateMenu(this.tabsL2[this.activeL2MenuValue], value);
            this.saveValue('activeL3Menu', value);
            this.getRanking(this.activeL3MenuValue);
          });
          if (defaultValue = this.getValue('activeL2Menu')) {
            this.activeL2Menu.next(defaultValue);
          } else {
            this.activeL2Menu.next(Object.keys(this.tabsL2)[0]);
          }



        } else if (this._premiumService.contestHasStarted()
          && this.activeL2MenuValue
          && !this.isAllowed
        ) {
        } else {
          this.loadUsers();
        }
      } else {
        this.podium = [];
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
      if (this._premiumService.contestHasStarted() && this.isAllowed) {
        this.getRanking(this.activeL3MenuValue);
      } else {
        this.loadUsers();
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

  public goToPremium() {
    if (this._modal) {
      this._modal.close();
    }
    this._router.navigate(['/formules']);
  }

  public ngOnDestroy() {
    if (this._modal) {
      this._modal.close();
    }
  }
}
