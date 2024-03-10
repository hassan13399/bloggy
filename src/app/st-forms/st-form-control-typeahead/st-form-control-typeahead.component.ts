import { Component, OnInit } from '@angular/core';
import { StFormControlComponent } from '../st-form-control/st-form-control.component';
import { StFormModelTypeahead } from './st-form-model-typeahead';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

@Component({
  selector: 'st-form-control-typeahead',
  templateUrl: '../st-form-control/st-form-control.component.html',
})
export class StFormControlTypeaheadComponent extends StFormControlComponent implements OnInit {

  // searching variables pour searching
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  ngOnInit() {
  }

  inputFormatter(input) {
    return input.name;
  }

  resultFormatter(input) {
    return input.name;
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.remoteService.search(term, this.model['targetModel'])
          .do(() => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed);
}

