import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { StFormService } from '../st-form.service';

import {
  DynamicFormComponent,
  DynamicFormControlEvent,
  DynamicFormControlModel,
  DynamicFormLayout,
  DynamicFormLayoutService,
  DynamicFormService,
  DynamicTemplateDirective,
} from '@ng-dynamic-forms/core';
import { StFormControlComponent } from '../st-form-control/st-form-control.component';

export interface StFormEvent {
  formGroup: FormGroup;
  context: any
}

@Component({
  selector: 'st-form',
  templateUrl: './st-form.component.html',
  styleUrls: ['./st-form.component.scss']
})
export class StFormComponent extends DynamicFormComponent {

  formGroup: FormGroup;
  formModel: DynamicFormControlModel[];
  @Input('jsonModel') jsonModel: string;
  @Input('objectModel') objectModel: object[];
  @Input('layout') formLayout: DynamicFormLayout;

  @Output('dfBlur') blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
  @Output('dfChange') change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
  @Output('dfFocus') focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
  @Output('stAfterFormInit') stAfterFormInit: EventEmitter<StFormEvent> = new EventEmitter();

  @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;
  @ViewChildren(StFormControlComponent) components: QueryList<StFormControlComponent>;

  constructor(protected http: HttpClient, protected stFormService: StFormService, protected formService: DynamicFormService,
              protected layoutService: DynamicFormLayoutService) {
    super(formService, layoutService);
  }

  ngOnInit() {
    // note that this is asynchronous. We need to put *ngIf="formGroup" in the main element of the html template
    // to assure that this.formGroup is instantiated
    this.init();
  }

  init() {
    if (this.objectModel) {
      this.formModel = this.stFormService.fromJSON(this.objectModel);
      this.formGroup = this.formService.createFormGroup(this.formModel);
      this.stAfterFormInit.emit(this.createStFormEvent(this.formGroup, this));
    } else {
      const json = '../../../../assets/' + this.jsonModel + '.json';
      this.http.get<object[]>(json)
        .subscribe(formModelJson => {
          this.formModel = this.stFormService.fromJSON(formModelJson);
          this.formGroup = this.formService.createFormGroup(this.formModel);
          this.stAfterFormInit.emit(this.createStFormEvent(this.formGroup, this));
        });
    }
  }

  setValue(values) {
    // set the values
    this.formGroup.patchValue(values);
  }

  createStFormEvent(formGroup: FormGroup, context){
    return {
      formGroup: formGroup,
      context: context
    };
  }
}