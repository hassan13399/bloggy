import { Component, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { StMessageService } from './st-forms/st-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Bloggyfoot';
  bodyClass = '';
  constructor(
    private translate: TranslateService,
    private router: Router,
    private msg: StMessageService,
    private renderer: Renderer2
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('fr');

    const lang = localStorage.getItem('lang');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    if (lang) {
      translate.use(lang);
    } else {
      translate.use('fr');
    }

    // needed the first time
    this.msg.getMessage('bodyClass').subscribe(bodyclass => {
      this.bodyClass = 'sudinfo';
      this.renderer.addClass(document.body, this.bodyClass);
    });

    if (localStorage.getItem('source') === 'sudinfo') {
      this.bodyClass = 'sudinfo';
    }

    if (this.bodyClass) {
      this.renderer.addClass(document.body, this.bodyClass);
    }
  }

  public ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      window.scrollTo(0, 0);
    });
  }
}