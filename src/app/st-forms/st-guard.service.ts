import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { StRemoteDataService } from './st-remote-data.service';
import { Router } from '@angular/router';
import { StMessageService } from './st-message.service';

@Injectable()
export class StGuardService implements CanActivate {

  isAuthenticated = false;
  constructor (private remoteService: StRemoteDataService, private router: Router, private msg: StMessageService) {
    this.isAuthenticated = this.remoteService.isAuthenticated();
  }

  canActivate() {
    // console.log('canActivate');
    if (this.remoteService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
