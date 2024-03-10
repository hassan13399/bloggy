import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-redirect',
  templateUrl: './page-redirect.component.html',
  styleUrls: ['./page-redirect.component.scss']
})
export class PageRedirectComponent implements OnInit {

  redirect;
  data;
  constructor(private router: Router, private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      if (params) {
          this.redirect = params['redirect']; //
          this.data = params['data'];

          localStorage.setItem('redirectAction', this.redirect);
          localStorage.setItem('redirectData', this.data);

        if (localStorage.getItem('source') === 'sudinfo') {
          window.location.href = environment.sudinfoUrl;
        } else {
          window.location.href = environment.websiteUrl;
        }
      }
    });
  }

  ngOnInit() {
  }

}