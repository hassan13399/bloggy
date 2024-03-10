import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'st-form-control-birthday',
  templateUrl: './st-form-control-birthday.component.html',
  styleUrls: ['./st-form-control-birthday.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: StFormControlBirthdayComponent,
      multi: true
    }
  ],
})
export class StFormControlBirthdayComponent implements ControlValueAccessor {

  value;
  onChange;
  years;
  months;
  days;
  year;
  month;
  day;
  constructor() {
    this.years = [''];
    this.months = [''];
    this.days = [''];

    let i = 0;
    for (i = 1918; i < 2018; i++) {
      this.years.push(i);
    }

    for (i = 1; i < 13; i++) {
      this.months.push(i);
    }

    for (i = 1; i < 32; i++) {
      this.days.push(i);
    }
  }

  writeValue(value) {
    if (value) {
      let values = value.split('-');
      if (values.length === 3) {
        this.year = values[0];
        this.month = parseInt(values[1], 10);
        this.day = parseInt(values[2], 10);
      } else {
        values = value.split('/');

        if (values.length === 3) {
          this.year = values[2];
          this.month = parseInt(values[1], 10);
          this.day = parseInt(values[0], 10);
        }
      }
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
  }

  onValueChange(value) {
    this.value = '';

    if (this.year && this.month && this.day) {
      this.value = this.year + '-' + this.lengthFormat(this.month) + '-' + this.lengthFormat(this.day);
    }

    this.onChange(this.value);
  }

  // add 0 before the month and day
  private lengthFormat(str) {
    if (str && str.length === 1 ) {
      str = '0' + str;
    }

    return str;
  }
}