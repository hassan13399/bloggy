import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { StRemoteDataService } from '../st-forms/st-remote-data.service';
import { StFormService } from '../st-forms/st-form.service';
import { DynamicFormService } from '@ng-dynamic-forms/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import {ActivatedRoute, Router} from '@angular/router';
import {PremiumService} from '../services/premium.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-page-prono',
  templateUrl: './page-prono.component.html',
  styleUrls: ['./page-prono.component.scss']
})
export class PagePronoComponent implements OnInit, OnDestroy {
  activeDays = ['prologue', 'day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day8'];

  dayByPhase = {
    prologue: ['prologue'],
    phase1: ['day1', 'day2', 'day3'], // journée 1, journée 2, journée 3
    phase2: ['day4', 'day5', 'day6', 'day8']  // Huitième, Quart, Demies, (Bronze day7), Finale
  };
  phaseMenu;
  dayMenu;
  activePhase: Subject<any> = new Subject();
  activeDay: Subject<any> = new Subject();
  pronoDefs; // list of pronoDefs for the activeDay
  localActiveDay;
  userId = null;
  userPseudo = '';
  isMyProno = false; // true if the user edit his own prono
  disableJoker = false; // true  if a prono is with a joker and this prono is not active - info return by the backend

  // form
  jsonModel = 'prono-form';
  formModel;

  public isAllowedToEdit:  boolean;
  public currentEditionCount: number;

  @ViewChild('NotAllowed') notAllowedModal: ElementRef;
  @ViewChild('AskToEdit') askToEditModal: ElementRef;

  public doEditEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _modal: NgbModalRef;

  /**
   * The current locale
   * @type {string}
   */
  public currentLocale = 'en';

  public currentImageSrc: string;
  public currentPromoImageSrc: string;

  constructor(
    protected http: HttpClient,
    private stFormService: StFormService,
    protected formService: DynamicFormService,
    private remoteService: StRemoteDataService,
    private route: ActivatedRoute,
    private _premiumService: PremiumService,
    private _modalService: NgbModal,
    private _translate: TranslateService,
    private _router: Router
  ) {
    this.currentLocale = this._translate.currentLang;
    this.currentImageSrc = '/assets/img/pro_illimited_update_' + this.currentLocale + '.png';
    this.currentPromoImageSrc = '/assets/img/pro_offer_' + this.currentLocale + '.png';
    this._translate.onLangChange.subscribe(event => {
      this.currentImageSrc = '/assets/img/pro_illimited_update_' + event.lang + '.png';
      this.currentPromoImageSrc = '/assets/img/pro_offer_' + event.lang + '.png';
    });
    let localActivePhase = localStorage.getItem('activePhase');
    this.localActiveDay = localStorage.getItem('activeDay');
    this._countPronoUpdates();
    this.activeDay.subscribe(value => {
      localStorage.setItem('activeDay', value);
      this.localActiveDay = value;
      this.dayMenu = this.generateMenu(this.dayByPhase[localActivePhase], value);
      if (this.formModel) {
        this.refreshPronoDefs(this.localActiveDay);
      }
    });

    // to do: déterminer les phases par défaut à partir de la date du day
    this.activePhase.subscribe(value => {
      localStorage.setItem('activePhase', value);
      localActivePhase = value;
      this.phaseMenu = this.generateMenu(Object.keys(this.dayByPhase), value);
      if (value === 'phase1') {
        this.activeDay.next(this.dayByPhase[value][0]);
      } else {
        this.activeDay.next(this.dayByPhase[value][0]);
      }

      //console.log('active day: ', value);
      //console.log('phase menu :', this.phaseMenu);
    });

    if (localActivePhase) {
      this.activePhase.next(localActivePhase);
      //this.setActivePhase('prologue');
      //this.activeDay.next(this.dayByPhase[this.activePhase][0]);
      //this.activeDay.next(localActiveDay);
    } else {
      // localStorage.setItem('activePhase', 'phase1');
      // this.activePhase.next('phase1');

      localStorage.setItem('activePhase', 'prologue');
      this.activePhase.next('prologue');
      //this.activeDay.next(this.dayByPhase[localActivePhase][0]);
    }
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params) {
        this.userId = +params['userId']; // + means transform in integer
        this.isMyProno = this.userId ? false : true;
      }
    });

    this.localActiveDay = localStorage.getItem('activeDay');
    // load model for formGroup
    const json = '../../../../assets/' + this.jsonModel + '.json';
    this.http.get<object[]>(json)
      .subscribe(formModelJson => {
        this.formModel = this.stFormService.fromJSON(formModelJson);

        // load data: prono & pronodefs
        this.refreshPronoDefs(this.localActiveDay);
      });
  }

  refreshPronoDefs(day) {
    this.remoteService.getPronoForDay(day, this.userId)
      .subscribe(data => {
        this.disableJoker = data['disableJoker'] || false;
        this.pronoDefs = this.prepareData(data);
        // set pseudo for case of showing other pronos
        if (this.pronoDefs && this.pronoDefs.length && !this.isMyProno) {
          if (this.pronoDefs[0]['prono']) {
            this.userPseudo = this.pronoDefs[0]['prono']['user']['pseudo'];
          }
        }
      });
  }

  protected prepareData(data) {
    const result = new Array();

    // add pronodef
    data['pronoDefs'].forEach(function(pronoDef) {
      const pronoDefId = pronoDef['id'];
      const formGroup = this.formService.createFormGroup(this.formModel);

      // find the prono associated to pronoDefId
      var prono = data['pronos'].find(function(element) {
        if(element.pronoDef.id === pronoDefId)  {
          return element;
        }
      });

      if (prono) {
        formGroup.patchValue(prono);
      } else {
        prono = null;
      }

      const item = {
        id: pronoDefId,
        formGroup: formGroup,
        pronoDef: pronoDef,
        prono: prono
      };

      result.push(item);
    }, this);

    return result;
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

  changeJoker(event) {
    const pronoDefId = event.pronoDefId;
    const value = event.value;

    // set joker of other prono to false
    if (value === true ) {
      this.pronoDefs.forEach(function(pronoDef) {
        const nullValue = {
          joker: false
        };
        const id = pronoDef['id'];
        if (id !== pronoDefId) {
          pronoDef.formGroup.patchValue(nullValue);
        }
      }, this);
    }
  }

  public hasEdited($event) {
    this._countPronoUpdates();
  }

  public notAllowToEdit($event) {
    this._modal = this._modalService.open(this.notAllowedModal);
  }

  private _countPronoUpdates() {
    this.remoteService.getPronoUpdateCount().subscribe((data: any) => {
      this.currentEditionCount = data.count;
      if (data.count >= 3 && this._premiumService.shouldPay()) {
        this.isAllowedToEdit = false;
      } else {
        this.isAllowedToEdit = true;
      }
    });
  }

  public emitDoEdit() {
    if (this._modal && this._modal.close()) {
      this._modal.close();
    }
    this.doEditEvent.emit(true);
  }

  public askToEdit($event) {
    if (this._premiumService.shouldPay()) {
      this._modal = this._modalService.open(this.askToEditModal);
    } else {
      this.emitDoEdit();
    }
  }

  public ngOnDestroy() {
    if (this._modal) {
      this._modal.close();
    }
  }

  public isPremium() {
    return this._premiumService.isUserPremium();
  }

  public goToPremium() {
    this._router.navigate(['/formules']);
  }

  public isDayActive(day: string) {
    return this.activeDays.includes(day);
  }
}
