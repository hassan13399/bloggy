import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

/*
the type of message are the type foreseen by bootstrap:

we advice to use:
-success
-danger
-info

other types of bootstrap are:
-primary
-secondary
-warning
-light
-dark
 */

@Injectable()
export class StMessageService {

  private messageQueue = {};

  protected initQueue(destination) {
    if (!this.messageQueue[destination]) {
      this.messageQueue[destination] = new Subject<any>();
    }
  }

  sendMessage(destination, type, text, duration = 5000) {
    const message = {
      type: type,
      text: text,
      duration: duration
    };

    this.initQueue(destination);
    this.messageQueue[destination].next(message);
  }

  clearMessage(destination) {
    this.messageQueue[destination].next();
  }

  getMessage(destination): Observable<any> {
    this.initQueue(destination);
    return this.messageQueue[destination].asObservable();
  }

  sendFlash(type, text, duration = 5000) {
    const message = {
      type: type,
      text: text,
      duration: duration
    };

    localStorage.setItem('flash', JSON.stringify(message));
  }

  // getflash will also delete the content of the flash!
  getFlash() {
    const flash = localStorage.getItem('flash');

    if (flash) {
      // clear the flash
      localStorage.setItem('flash', '');

      // return the value
      return JSON.parse(flash);
    }
    return null;
  }
}