import { environment } from '../../../environments/environment';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { StRemoteDataService } from '../../st-forms/st-remote-data.service';
import { StMessageService } from '../../st-forms/st-message.service';
import * as moment from 'moment';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit, OnDestroy {

  modalRef;
  userInfo;
  activeLg;
  lgs;
  isAuthenticated = false;
  userPhoto;
  subscription;

  @ViewChild('content') modal;

  constructor(private translate: TranslateService, private modalService: NgbModal, private msg: StMessageService,
              private router: Router, private remoteService: StRemoteDataService) {
    this.isAuthenticated = this.remoteService.isAuthenticated();
    if (this.isAuthenticated) {
      const userInfo = this.remoteService.getUserInfo();
      if (userInfo['photo']) {
        this.userPhoto = this.remoteService.getImagePath(userInfo['photo']);
      } else {
        this.userPhoto = '/assets/img/avatar_turquoise.png';
      }
    }
  }

  ngOnInit() {
    this.userInfo = this.remoteService.getUserInfo();
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'fr');
    }
    this.activeLg = localStorage.getItem('lang');
    this.initLgs(this.activeLg);

    // open modal id message sent
    this.subscription = this.msg.getMessage('modalLogin').subscribe(text => {
      this.open();
    });
  }

  switchLanguage(lang) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.msg.sendMessage('lang', 'lang', lang);
    this.activeLg = lang;
    this.initLgs(lang);
  }

  initLgs(lang) {
    this.lgs = ['fr', 'nl', 'en'];
    //delete this.lgs[lang];

    const index = this.lgs.indexOf(lang);
    if (index !== -1) {
      this.lgs.splice(index, 1);
    }
  }

  open() {
    this.modalRef = this.modalService.open(this.modal);
    /*
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    */
  }

  afterForgotPassword($event) {
    return true;
  }

  afterCreateAccount($event) {
    this.modalRef.close();
    this.router.navigate([environment.register]);
  }

  fbConnect() {
    this.remoteService.fbConnect().then(data => {
      this.modalRef.close();
      if (data['new']) {
        this.router.navigate([environment.afterFbSignup]);
        this.msg.sendFlash('success', 'USER.complete_profile');
      } else {
        this.router.navigate([environment.afterSignin]);
        this.msg.sendFlash('success', 'USER.signin ok');
      }
    });
  }

  afterSignin($event) {
    if ($event.status === 'OK') {
      this.modalRef.close();
      this.router.navigate([environment.afterSignin]);
      this.msg.sendFlash('success', 'USER.signin ok');
    }
  }

  logout() {
    this.remoteService.logout();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public contestHasStarted(): boolean {
    const startDate = moment(environment.competition_start);
    const now = moment();
    const duration = moment.duration(now.diff(startDate));
    return duration.asHours() >= 1.5;
  }
}