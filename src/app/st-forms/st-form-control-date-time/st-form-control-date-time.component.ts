import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'st-form-control-date-time',
  templateUrl: './st-form-control-date-time.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: StFormControlDateTimeComponent,
      multi: true
    }
  ],
})
export class StFormControlDateTimeComponent implements ControlValueAccessor {

  value;
  onChange;
  displaySelector = false;
  startDate: number; // start date - timestamp fo the start date of the selector, in millisecond

  writeValue(value) {
    if (value) {
      this.value = moment(value).utc().local().format('YYYY-MM-DD HH:mm:ss');
      this.startDate = parseInt(moment(value).format('X'), 10) * 1000;
    } else {
      this.value = moment().utc().local().format('YYYY-MM-DD HH:mm:ss');
      this.startDate = parseInt(moment().format('X'), 10) * 1000;
    }

    // console.log(this.value);
    // console.log(this.startDate);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
  }

  showSelector() {
    moment.locale('fr');

    if(this.displaySelector === false) {
      this.displaySelector = true;
    } else {
      this.displaySelector = false;
    }
  }

  onDateTimeSelect($event) {
    this.value = moment.utc($event.value.getTime()).local().format('YYYY-MM-DD HH:mm:ss');
    this.startDate = parseInt(moment(this.value).format('X'), 10) * 1000;
    this.onChange(this.value);
    this.displaySelector = false;
  }
}