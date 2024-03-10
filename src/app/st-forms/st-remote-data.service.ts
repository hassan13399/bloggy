import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams,  HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import { FacebookService, InitParams } from 'ngx-facebook';
import { StMessageService } from './st-message.service';

// to make this work, we had '*.json module' in typings.d.ts
import * as CountriesEN from '../../environments/country/en.json';
import * as CountriesFR from '../../environments/country/fr.json';
import * as CountriesNL from '../../environments/country/nl.json';

// for authentication request
const URL = environment.remoteUrl;

const AUTH_PREFIX = 'jwt';
const TOKEN_NAME = 'jwtToken';

@Injectable()
export class StRemoteDataService {

  constructor(private http: HttpClient, private fb: FacebookService, private msg: StMessageService,
              private router: Router) {}

  getOptions(targetModel, targetField): Observable<any[]> {

    let url = '';
    let countries;

    switch (targetModel) {
      case 'country':
        const lg = localStorage.getItem('lang');
        switch (lg) {
          case 'en':
            countries = CountriesEN;
            break;
          case 'nl':
            countries = CountriesNL;
            break;
          default:
            countries = CountriesFR;
            break;
        }

        const result = [];
        Object.keys(countries).map(function(objectKey, index) {
          const value = countries[objectKey];
          result.push({
            value: objectKey,
            label: value
          });
        });

        return of(result);
      default:
        url = URL + '/model/' + targetModel + '/options/' + targetField;
        // const url = '../assets/select.json';
        return this.http
          .get<any[]>(url);
        // .do(console.log);
    }
  }

  getRemoteAddress(remoteAddress) {

    // replace {{lang}} in remoteAdress by the user language
    const lang = localStorage.getItem('lang');
    const  address = remoteAddress.replace('{{lang}}', lang);

    // return data
    return this.http
      .get(URL + '/' + address);
  }

  search(term: string, model: string) {
    if (term === '') {
      return of([]);
    }
    const field = 'name'; // should be replace dynamically

    return this.http
      .post( URL + '/model/' + model + '/search/' + field + '/' + term, {})
      .map(data => data);
  }

  getList(model, offset: number, limit: number) {
    return this.http
      .get(URL + '/model/' + model + '/list/' + offset + '/' + limit);
  }

  getM2m(model, sourceId) {
    return this.http
      .get(URL + '/model/' + model + '/m2mList/' + sourceId);
  }

  deleteM2m(model, sourceField, sourceId, targetField, targetId) {
    return this.http
      .post(URL + '/model/' + model + '/m2mDelete/' + sourceField + '/' + sourceId + '/' + targetField + '/' + targetId, {});
  }

  getDetail(id: number, model) {
    return this.http
      .get(URL + '/model/' + model + '/detail/' + id);
  }

  update(id: number, data, model) {
    return this.http
      .put(URL + '/model/' + model + '/update/' + id, data);
  }

  create(data, model) {
    return this.http
      .post(URL + '/model/' + model + '/create', data);
  }

  delete(id: number, model) {
    return this.http
      .post(URL + '/model/' + model + '/delete/' + id, {});
  }

  sendFacebookToken(token) {
    const source =  localStorage.getItem('source') ? localStorage.getItem('source') : '';

    return this.http
      .post(URL + '/auth/facebook/token', {access_token: token, source: source});
  }

  getImagePath(jsonImage) {
    const image = JSON.parse(jsonImage);
    return URL + image.path;
  }

  // user: logout
  logout() {
    localStorage.setItem(TOKEN_NAME, '');
    this.storeUserInfo({});
    this.msg.sendMessage('signinOK', 'success', 'false');
    this.router.navigate(['']);
  }

  // user: create
  createUser(data) {
    return this.http.post(URL + '/user/create', data);
  }

  // user: confirm
  confirmUser(code) {
    return this.http.get(URL + '/user/confirm/' + code);
  }

  // user: load profile
  loadProfile() {
    return this.http.get(URL + '/user/profile');
  }

  // user: update
  updateUser(data) {
    return this.http.put(URL + '/user/profile', data);
  }

  // store local user info
  storeUserInfo(user) {
    localStorage.setItem('user',  JSON.stringify(user));
    return user;
  }

  // store single value
  storeUserValue(key, value) {
    let user;
    user = this.getUserInfo();
    if (!user) {
      user = {};
    }
    user[key] = value;
    this.storeUserInfo(user);
  }

  // get local user value
  getUserValue(key) {
    let user = {};
    user = this.getUserInfo();

    if (user) {
      return user[key] ? user[key] : null;
    }

    return null;
  }

  // get local user info
  getUserInfo() {
    return  JSON.parse(localStorage.getItem('user'));
  }

  // setToken
  setToken(token) {
    localStorage.setItem(TOKEN_NAME, token);
  }

  // is Authenticated
  isAuthenticated() {
    return localStorage.getItem('jwtToken') ? true : false;
  }

  // signin
  signin(data) {
    return this.http.post(URL + '/user/signin', data);
  }

  createResetCode(data) {
    return this.http.post(URL + '/user/reset/code', data);
  }

  resetPassword(data) {
    return this.http.post(URL + '/user/reset/password', data);
  }

  fbConnect() {
    return new Promise((resolve, reject) => {

      /*
      const initParams: InitParams = {
        appId: '783421805189278',
        xfbml: true,
        version: 'v2.12'
      };
      */

      this.fb.init(environment['facebook']);

      const options = {
        // scope: 'public_profile,user_friends,email,user_birthday,pages_show_list',
        scope: 'public_profile,email',
        return_scopes: true,
        enable_profile_selector: true
      };
      this.fb.login(options)
        .then(response => {
          const token = response.authResponse.accessToken;
          this.sendFacebookToken(token).subscribe(data => {
            localStorage.setItem('jwtToken', data['token']);
            this.storeUserInfo(data['user']);
            this.msg.sendMessage('signinOK', 'success', 'true');
            resolve(data);
          });
        })
        .catch(reason => reject(reason));
    });
  }

  /*
   * CMS
   */
  // find one element
  cmsFindOne(category) {
    return this.http
      .get(URL + '/cms/single/' + category + '/created_at');
  }

  // find all element
  cmsFindAll(category, limit = 20) {
    return this.http
      .get(URL + '/cms/all/' + category + '/created_at/' + limit);
  }

  /*
   * Mail
   */
  // bloggy group list
  sendMail() {
    const data = {};
    return this.http.post(URL + '/mail/send', data);
  }

  /*
   * BLOGGY
   */
  getPronoForDay(dayLabel, userId = false) {
    if (userId) {
      return this.http
        .get(URL + '/bloggy/prono/list/day/' + dayLabel + '/' + userId);
    } else {
      return this.http
        .get(URL + '/bloggy/prono/list/day/' + dayLabel);
    }
  }

  saveProno(pronoDefId, data) {
    return this.http
      .post(URL + '/bloggy/prono/save/' + pronoDefId, data);
  }

  // bloggy group create
  createGroup(data) {
    return this.http.post(URL + '/bloggy/group/create', data);
  }

  // bloggy group create
  modifyGroup(groupId, data) {
    return this.http.post(URL + '/bloggy/group/modify/' + groupId, data);
  }

  // bloggy group load data
  loadGroup(id) {
    return this.http.get(URL + '/bloggy/group/load/' + id);
  }

  // bloggy group list
  groupMy() {
    return this.http.get(URL + '/bloggy/group/my');
  }

  // bloggy group list
  kickUserFromGroup(gid, uid) {
    return this.http.get(URL + '/bloggy/group/kick/' + gid + '/' + uid);
  }

  // select options pour les groupe dont je suis capitaine
  groupMyAsCaptain() {
    return this.http.get(URL + '/bloggy/group/my/captain');
  }

  // bloggy user within a group
  groupUsers(groupId) {
    return this.http.get(URL + '/bloggy/group/users/' + groupId);
  }

  // bloggy user within a group
  groupJoin(data) {
    return this.http.post(URL + '/bloggy/group/join', data);
  }

  groupSendInvitation(groupId) {
    const data = {group: groupId};
    return this.http.post(URL + '/bloggy/group/invitation/send', data);
  }

  // ranking
  // param is the name of the day or the phase
  getDayIndividualRanking(dayLabel, params?: any) {
    params['payment_version'] = true;
    return this.http.get(URL + '/bloggy/rank/individual/day/' + dayLabel, { params: params });
  }

  getPhaseIndividualRanking(phaseLabel, params?: any) {
    params['payment_version'] = true;
    return this.http.get(URL + '/bloggy/rank/individual/phase/' + phaseLabel, { params: params });
  }

  // ranking
  // param is the name of the day or the phase
  getDayGroupRanking(dayLabel, params?: any) {
    params['payment_version'] = true;
    return this.http.get(URL + '/bloggy/rank/group/day/' + dayLabel, { params: params });
  }

  getPhaseGroupRanking(phaseLabel, params?: any) {
    params['payment_version'] = true;
    return this.http.get(URL + '/bloggy/rank/group/phase/' + phaseLabel, { params: params });
  }

  getDayMyGroupRanking(groupId, dayLabel) {
    const params = {};
    params['payment_version'] = true;
    return this.http.get(URL + '/bloggy/rank/mygroup/' + groupId + '/day/' + dayLabel, { params: params });
  }

  getPhaseMyGroupRanking(groupId, phaseLabel) {
    const params = {};
    params['payment_version'] = true;
    return this.http.get(URL + '/bloggy/rank/mygroup/' + groupId + '/phase/' + phaseLabel, { params: params });
  }

  getMyRankings() {
    return new Observable((observer) => {
      let value;

      /*
      if (localStorage.getItem('myRankings')) {
        value = JSON.parse(localStorage.getItem('myRankings'));
      };
      */

      /*
      if (Math.floor((Math.random() * 3) === 0)); {
      }
      */

      // JSON.parse(localStorage.getItem('user'));
      return this.http.get(URL + '/bloggy/rank/my').subscribe(data => {
        observer.next(data);
        localStorage.setItem('myRankings',  JSON.stringify(data));
      });

    });
  }

  // param is the name of the day or the phase
  getGroupRanking(groupId, param) {
    return this.http.get(URL + '/bloggy/rank/group/' + groupId + '/' + param);
  }

  getPronoTimeRemaining(uid) {
    return this.http.get(URL + '/timer/get-remaining-time/' + uid);
  }

  public getUserFirstGroup() {
    return this.http.get(URL + '/bloggy/group/get-first');
  }

  // test
  test(data) {
    return this.http.post(URL + '/user/test', data);
  }

  public deleteGroup(gid: number) {
    return this.http.get(URL + '/bloggy/group/delete/' + gid);
  }

  public leaveGroup(gid: number) {
    return this.http.get(URL + '/bloggy/group/leave/' + gid);
  }

  /*
  public getFirstPronoDefOfToday() {
    // console.log('ici');
    return this.http.get(URL + '/bloggy/pronoDefs/today');
  }
  */

  public getFirstPronoDefOfToday() {
    // console.log('ici');
    return new Observable((observer) => {

      let value = localStorage.getItem('FirstPronoDefOfToday');
      if (value) {
        observer.next(value);
        // localStorage.setItem('user',  JSON.stringify(user));
      } else {
        this.http.get(URL + '/bloggy/pronoDefs/today').subscribe(data => {
          // console.log(data);
          observer.next(data);
          //observer.complete();
        });
      }

    });
  }

  //  getNextPronoDefDate
  public getNextPronoDefDate() {
    return this.http.get(URL + '/data/pronoDef/nextDate');
  }

  public getPronoUpdateCount() {
    return this.http.get(URL + '/prono-update/count');
  }

}
