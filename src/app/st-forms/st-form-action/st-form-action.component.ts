import { StFormComponent, StFormEvent} from '../st-form/st-form.component';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StRemoteDataService } from '../st-remote-data.service';
import { DynamicFormLayoutService, DynamicFormService } from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';

export interface StDataEvent {
  data: any;
  formGroup: FormGroup,
  context: any
}

@Component({
  selector: 'st-form-action',
  templateUrl: './st-form-action.component.html',
  styleUrls: ['./st-form-action.component.scss']
})
export class StFormActionComponent   {

  @Input('item') item = null;
  @Input('model') model: string;
  @Input('jsonModel') jsonModel: string;

  @Output('stDataSave') stDataSave: EventEmitter<StDataEvent> = new EventEmitter();
  @ViewChild(StFormComponent) stFormComponent;

  formLayout;

  protected createStDataEvent(item: any, formGroup: FormGroup, context): StDataEvent {
    return {
      data: item,
      formGroup: formGroup,
      context: context
    };
  }

  constructor(protected http: HttpClient, private remoteService: StRemoteDataService,
    protected formService: DynamicFormService, protected layoutService: DynamicFormLayoutService) {}

  reset(): void {
    // console.log('reset in st-form-action');
    this.stFormComponent.init();
    this.stFormComponent.formGroup = null;
    this.item = null;
  }

  onFormInit(event: StFormEvent){
    if (this.item) {
      this.stFormComponent.formGroup.patchValue(this.item);
    }
  }

  save(): void {
    const values = {};
    Object.assign(values, this.stFormComponent.formGroup.value);

    if(this.item && this.item.hasOwnProperty('id')) {
      this.remoteService.update(this.item.id, values, this.model)
        .subscribe(data => {
          Object.assign(this.item, this.item, data);
          this.stDataSave.emit(this.createStDataEvent(data, this.stFormComponent.formGroup, this));
        });
    } else {
      this.remoteService.create(values, this.model)
        .subscribe(data => {
          this.item = data;
          this.stDataSave.emit(this.createStDataEvent(data, this.stFormComponent.formGroup, this));
        });
    }
  }

  delete() {
    this.remoteService.delete(this.item.id, this.model)
      .subscribe(data => {});
  }
}