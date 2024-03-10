import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'st-form-control-ckeditor',
  templateUrl: './st-form-control-ckeditor.component.html',
  styleUrls: ['./st-form-control-ckeditor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: StFormControlCkeditorComponent,
      multi: true
    }
  ]
})
export class StFormControlCkeditorComponent implements ControlValueAccessor {

  editorValue;
  onChange;
  writeValue(value) {
    if (value) {
      this.editorValue = value;
    }

    // console.log(this.value);
    // console.log(this.startDate);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  onValueChange($event) {
    this.onChange(this.editorValue);
  }

  registerOnTouched(fn) {
  }


}
