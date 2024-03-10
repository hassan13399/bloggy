import {
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges, OnInit,
  Output,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  DynamicInputModel,
  DynamicFormArrayGroupModel,
  DynamicFormControlComponent,
  DynamicFormControlEvent,
  DynamicFormControlModel,
  DynamicFormLayout,
  DynamicFormLayoutService,
  DynamicFormValidationService,
  DynamicTemplateDirective,
  DynamicFormControlValue,
  DynamicFormValueControlModel,
  DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
  DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
  DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
  DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
  DYNAMIC_FORM_CONTROL_TYPE_GROUP,
  DYNAMIC_FORM_CONTROL_TYPE_INPUT,
  DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
  DYNAMIC_FORM_CONTROL_TYPE_SELECT,
  DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
  DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER,
  DynamicDatePickerModel
} from '@ng-dynamic-forms/core';
import { ST_FORM_LAYOUT } from './st-form.layout'
import { StRemoteDataService } from '../st-remote-data.service';
import {ST_FORM_MODEL_TYPEAHEAD} from '../st-form-control-typeahead/st-form-model-typeahead';
import {ST_FORM_MODEL_DATETIME} from '../st-form-control-date-time/st-form-model-date-time';
import {ST_FORM_MODEL_IMAGE_UPLOAD} from '../st-form-control-image-upload/st-form-model-image-upload';
import {ST_FORM_MODEL_CKEDITOR} from '../st-form-control-ckeditor/st-form-model-ckeditor';
import {ST_FORM_MODEL_BIRTHDAY} from "../st-form-control-birthday/st-form-model-birthday";

export const enum StFormControlType {
  Array = 1, // "ARRAY",
  Calendar = 2, // "CALENDAR",
  Checkbox = 3, // "CHECKBOX",
  CheckboxGroup = 4, // "CHECKBOX_GROUP",
  DatePicker = 5, // "DATEPICKER",
  Group = 6, // "GROUP",
  Input = 7, // "INPUT",
  RadioGroup = 8, // "RADIO_GROUP",
  Select = 9, // "SELECT",
  TextArea = 10, // "TEXTAREA",
  TimePicker = 11, // "TIMEPICKER"
  Typeahead = 1000, // "TYPEAHEAD"
  StDateTime = 1001, // "ST_DATETIME"
  StImageUpload = 1002, // "ST_IMAGE_UPLOAD"
  StCkeditor = 1003, // "ST_CKEDITOR"
  StBirtday = 1004 // "ST_"
}

@Component({
  selector: 'st-form-control',
  templateUrl: './st-form-control.component.html',
  styleUrls: ['./st-form-control.component.scss']
})

export class StFormControlComponent extends DynamicFormControlComponent implements OnInit, OnChanges {

  @ContentChildren(DynamicTemplateDirective) contentTemplateList: QueryList<DynamicTemplateDirective>;
  @Input('templates') inputTemplateList: QueryList<DynamicTemplateDirective>;

  @Input() asBootstrapFormGroup: boolean = true;
  @Input() bindId: boolean = true;
  @Input() context: DynamicFormArrayGroupModel | null = null;
  @Input() group: FormGroup;
  @Input() hasErrorMessaging: boolean = false;
  @Input() layout: DynamicFormLayout;
  defaultLayout = ST_FORM_LAYOUT; // add class for all forms - @TODO: ne pas importer si layout est overdié via this.layout
  @Input() model: DynamicFormControlModel;

  @Output('dfBlur') blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
  @Output('dfChange') change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
  @Output('dfFocus') focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

  type: StFormControlType | null;

  constructor(protected remoteService: StRemoteDataService, protected changeDetectorRef: ChangeDetectorRef, protected layoutService: DynamicFormLayoutService,
              protected validationService: DynamicFormValidationService) {

    super(changeDetectorRef, layoutService, validationService);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if (changes['model']) {
      this.type = StFormControlComponent.getFormControlType(this.model);
    }
  }

  static getFormControlType(model: DynamicFormControlModel): StFormControlType | null {

    switch (model.type) {

      case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
        return StFormControlType.Array;

      case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
        return StFormControlType.Checkbox;

      case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
        return StFormControlType.CheckboxGroup;

      case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
        let datepickerModel = model as DynamicDatePickerModel;

        return datepickerModel.inline ? StFormControlType.Calendar : StFormControlType.DatePicker;

      case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
        return StFormControlType.Group;

      case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
        return StFormControlType.Input;

      case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
        return StFormControlType.RadioGroup;

      case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
        return StFormControlType.Select;

      case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
        return StFormControlType.TextArea;

      case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
        return StFormControlType.TimePicker;

      case ST_FORM_MODEL_TYPEAHEAD:
        return StFormControlType.Typeahead;

      case ST_FORM_MODEL_DATETIME:
        return StFormControlType.StDateTime;

      case ST_FORM_MODEL_IMAGE_UPLOAD:
        return StFormControlType.StImageUpload;

      case ST_FORM_MODEL_CKEDITOR:
        return StFormControlType.StCkeditor;

      case ST_FORM_MODEL_BIRTHDAY:
        return StFormControlType.StBirtday;

      default:
        return null;
    }
  }
}