import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { StRemoteDataService } from '../st-forms/st-remote-data.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {PremiumService} from '../services/premium.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-page-general-active',
  templateUrl: './page-general-active.component.html',
  styleUrls: ['./page-general-active.component.scss']
})
export class PageGeneralActiveComponent implements OnInit, OnDestroy {

  prefix = 'rankingStorage';
  tabsL1= {
    'rank_individual': 'personal',
    'rank_group': 'group'
  };

  tabsL2 = {
    'phase1': ['day1', 'day2', 'day3'],
    'phase2': ['day4', 'day5', 'day6', 'day7', 'day8'],
    'general': []
  };

  ranking; // contain data for the ranking
  podium; // 3 first of the ranking
  groupOrIndividual; // 'group' if display group ranking or 'individual'

  tabL1Menu;
  activeL1Menu: Subject<any> = new Subject();
  activeL1MenuValue;
  tabL2Menu;
  activeL2Menu: Subject<any> = new Subject();
  activeL2MenuValue;
  tabL3Menu;
  activeL3Menu: Subject<any> = new Subject();
  activeL3MenuValue;

  /**
   * show move
   * @type {boolean}
   */
  public showMove = false;

  /**
   * The current page
   * @type {number}
   */
  public page = 1;

  /**
   * @type {string}
   */
  public currentActiveMenu: string;

  /**
   * @type {number}
   */
  public totalItems: number;

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
   * @type {NgbModalRef}
   * @private
   */
  private _modal: NgbModalRef;

  /**
   * @type {number}
   */
  public userId: number;

  /**
   * @type {number}
   */
  public remainingTime: number;

  /**
   * @type {boolean}
   */
  public hasAccess: boolean;

  /**
   * The current locale
   * @type {string}
   */
  public currentLocale = 'en';

  public currentImageSrc: string;
  public currentTimerImageSrc: string;

  constructor(
    private remoteService: StRemoteDataService,
    private _modalService: NgbModal,
    private _premiumService: PremiumService,
    private _router: Router,
    private _translate: TranslateService
  ) {
    this.currentLocale = this._translate.currentLang;
    this.currentImageSrc = '/assets/img/pro_ranking_' + this.currentLocale + '.png';
    this.currentTimerImageSrc = '/assets/img/pro_illimited_consultation_' + this.currentLocale + '.png';
    this._translate.onLangChange.subscribe(event => {
      this.currentImageSrc = '/assets/img/pro_ranking_' + event.lang + '.png';
      this.currentTimerImageSrc = '/assets/img/pro_illimited_consultation_' + event.lang + '.png';
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
      this._loadData();
    });
  }

  private _loadData() {
    let defaultValue;
    const userInfo = this.remoteService.getUserInfo();
    this.userId = userInfo.id;
    this.activeL1Menu.subscribe(value => {
      this.activeL1MenuValue = value;
      this.tabL1Menu = this.generateMenu(Object.keys(this.tabsL1), value);
      this.saveValue('activeL1Menu', value);

      if (defaultValue = this.getValue('activeL2Menu')) {
        this.activeL2Menu.next(defaultValue);
      } else {
        this.activeL2Menu.next(Object.keys(this.tabsL2)[0]);
      }
    });

    this.activeL2Menu.subscribe(value => {
      this.tabL2Menu = this.generateMenu(Object.keys(this.tabsL2), value);
      this.activeL2MenuValue = value;
      this.saveValue('activeL2Menu', value);

      // showMove only for general ranking
      this.showMove = this.activeL2MenuValue === 'general';

      if (this.tabsL2[value].length) {
        this.activeL3Menu.next(this.tabsL2[value][0]);
      } else {
        this.currentActiveMenu = this.activeL2MenuValue;
        this.page = 1;
        this.getRanking(this.activeL2MenuValue);
        this.tabL3Menu = [];
      }
    });

    this.activeL3Menu.subscribe(value => {
      this.activeL3MenuValue = value;
      this.tabL3Menu = this.generateMenu(this.tabsL2[this.activeL2MenuValue], value);
      this.saveValue('activeL3Menu', value);
      this.currentActiveMenu = this.activeL3MenuValue;
      this.page = 1;
      this.getRanking(this.activeL3MenuValue);
    });

    if (defaultValue === this.getValue('activeL1Menu')) {
      this.activeL1Menu.next(defaultValue);
    } else {
      this.activeL1Menu.next(Object.keys(this.tabsL1)[0]);
    }
    if (this._premiumService.shouldPay()) {
      this.remoteService.getPronoTimeRemaining(this.userId)
        .subscribe((data: any) => {
          if (data.status === 'OK') {
            this.remainingTime = data.remaining_time;
          }
        });
    }
  }

  ngOnInit() {
  }

  saveValue(key, value) {
    localStorage.setItem(this.prefix + key, value);
  }

  getValue(key) {
    return localStorage.getItem(this.prefix + key);
  }

  getRanking(menuValue) {
    if (!this.hasAccess) {
      return;
    }
    // getRanking
    // type: rank_individual
    switch (this.activeL1MenuValue) {
      case 'rank_individual':
        this.groupOrIndividual = 'individual';
        if (this.isDay(menuValue)) {
          this.remoteService.getDayIndividualRanking(menuValue, { page: this.page }).subscribe((data: any) => {
            this.ranking = data.data;
            this.totalItems = Math.min(data.totalItems, 1000);
            this.updatePodium();
          }, err => {
            console.log('getDayIndividualRanking: ', err);
          });
        } else {
          this.remoteService.getPhaseIndividualRanking(menuValue, { page: this.page }).subscribe((data: any) => {
            this.ranking = data.data;
            this.totalItems = Math.min(data.totalItems, 1000);;
            this.updatePodium();
          }, err => {
            console.log('getPhaseIndividualRanking: ', err);
          });
        }
        break;
      case 'rank_group':
        this.groupOrIndividual = 'group';
        if (this.isDay(menuValue)) {
          this.remoteService.getDayGroupRanking(menuValue, { page: this.page }).subscribe((data: any) => {
            this.ranking = data.data;
            this.totalItems = Math.min(data.totalItems, 50);
            this.updatePodium();
          }, err => {
            console.log('getDayIndividualRanking: ', err);
          });
        } else {
          this.remoteService.getPhaseGroupRanking(menuValue, { page: this.page }).subscribe((data: any) => {
            this.ranking = data.data;
            this.totalItems = Math.min(data.totalItems, 50);
            this.updatePodium();
          }, err => {
            console.log('getPhaseIndividualRanking: ', err);
          });
        }
        break;
    }
  }

  protected isDay(label) {
    const str = label.substring(0, 3);
    const res = (label === 'prologue' || str === 'day');
    // console.log(label, str, res);
    return res;
  }

  protected updatePodium() {
    this.podium = [];
    for (let i = 0; i < 3; i++) {
      if (this.ranking[i]) {
        const points = this.ranking[i].points;
        if (this.ranking[i].type === 'group') {
          this.podium[i] = {
            name: this.ranking[i].group.name,
            photo: this.ranking[i].group.photo,
            points: points
          }
        } else {
          this.podium[i] = {
            name: this.ranking[i].user.pseudo,
            photo: this.ranking[i].user.photo,
            points: points
          }
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

  public loadData($event: number): void {
    this.page = $event;
    window.scrollTo(0, 0);
    this.getRanking(this.currentActiveMenu);
  }

  /**
   * Go to prono or open modal to indicate time left
   * @param {number} id
   * @param {boolean} skip
   */
  public goToProno(id: number, skip = false): void {
    this.selectedUser = id;
    if (this._premiumService.shouldPay() && skip === false && id !== this.userId) {
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

  public ngOnDestroy() {
    if (this._modal) {
      this._modal.close();
    }
  }
}
