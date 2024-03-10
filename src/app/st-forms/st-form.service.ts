import { Injectable } from "@angular/core";

import {
  DynamicFormService,
  DynamicFormValidationService,
  DynamicFormControlModel,
  DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
  DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
  DynamicFormArrayModel,
  DynamicFormArrayGroupModel,
  JSONUtils,
  DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
  DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER,
  DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
  DYNAMIC_FORM_CONTROL_TYPE_EDITOR,
  DynamicCheckboxModel,
  DynamicCheckboxGroupModel,
  DynamicColorPickerModel,
  DynamicDatePickerModel,
  DynamicEditorModel,
  DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD,
  DynamicFileUploadModel,
  DYNAMIC_FORM_CONTROL_TYPE_GROUP,
  DynamicFormGroupModel,
  DYNAMIC_FORM_CONTROL_TYPE_INPUT,
  DynamicInputModel,
  DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
  DynamicRadioGroupModel,
  DYNAMIC_FORM_CONTROL_TYPE_RATING,
  DYNAMIC_FORM_CONTROL_TYPE_SELECT,
  DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
  DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
  DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
  DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER,
  DynamicRatingModel,
  DynamicSelectModel,
  DynamicSliderModel,
  DynamicTextAreaModel,
  DynamicSwitchModel,
  DynamicTimePickerModel
} from '@ng-dynamic-forms/core';
import { ST_FORM_MODEL_TYPEAHEAD, StFormModelTypeahead } from './st-form-control-typeahead/st-form-model-typeahead';
import { ST_FORM_MODEL_DATETIME, StFormModelDateTime } from './st-form-control-date-time/st-form-model-date-time';
import { ST_FORM_MODEL_IMAGE_UPLOAD, StFormModelImageUpload } from './st-form-control-image-upload/st-form-model-image-upload';
import { ST_FORM_MODEL_CKEDITOR, StFormModelCkeditor } from './st-form-control-ckeditor/st-form-model-ckeditor';
import { ST_FORM_MODEL_BIRTHDAY, StFormModelBirthday } from './st-form-control-birthday/st-form-model-birthday';

import { HttpClient } from '@angular/common/http';
import { StRemoteDataService } from './st-remote-data.service';

@Injectable()
export class StFormService {

  constructor(public DynamicFormService: DynamicFormService, private http: HttpClient, private remoteService: StRemoteDataService) {}

  json: any;

  fromJSON(json: string | object[]): DynamicFormControlModel[] | never {

    let formModelJSON = typeof json === "string" ? JSON.parse(json, JSONUtils.parseReviver) : json,
      formModel: DynamicFormControlModel[] = [];

    formModelJSON.forEach((model: any) => {

      let layout = model.layout || model.cls || null;

      switch (model.type) {

        case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
          let formArrayModel = model as DynamicFormArrayModel;

          if (Array.isArray(formArrayModel.groups)) {
            formArrayModel.groups.forEach((groupModel: DynamicFormArrayGroupModel) => {
              groupModel.group = this.fromJSON(groupModel.group) as DynamicFormControlModel[];
            });
          }

          formArrayModel.groupFactory = () => {
            return this.fromJSON(formArrayModel.groupPrototype || formArrayModel.origin);
          };

          formModel.push(new DynamicFormArrayModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
          formModel.push(new DynamicCheckboxModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
          model.group = this.fromJSON(model.group) as DynamicCheckboxModel[];
          formModel.push(new DynamicCheckboxGroupModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER:
          formModel.push(new DynamicColorPickerModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
          formModel.push(new DynamicDatePickerModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_EDITOR:
          formModel.push(new DynamicEditorModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD:
          model.value = null;
          formModel.push(new DynamicFileUploadModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
          model.group = this.fromJSON(model.group);
          formModel.push(new DynamicFormGroupModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
          let inputModel = model as DynamicInputModel;

          if (inputModel.mask !== null) {
            inputModel.mask = JSONUtils.maskFromString(inputModel.mask as string);
          }

          formModel.push(new DynamicInputModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
          formModel.push(new DynamicRadioGroupModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_RATING:
          formModel.push(new DynamicRatingModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
          //formModel.push(new DynamicSelectModel(model, layout));
          const dynamicSelectModel = new DynamicSelectModel(model, layout);
          // let addressOptions = '';
          // addressOptions = model.localOptions ? ("../assets/" + model.localOptions) : model.targetModel;

          if (model.targetModel) {
            dynamicSelectModel.options = this.remoteService.getOptions(model.targetModel, model.targetField);
          } else if (model.remoteAddress) {
            dynamicSelectModel.options = this.remoteService.getRemoteAddress(model.remoteAddress);
          }

          formModel.push(dynamicSelectModel);
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
          formModel.push(new DynamicSliderModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
          formModel.push(new DynamicSwitchModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
          formModel.push(new DynamicTextAreaModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
          formModel.push(new DynamicTimePickerModel(model, layout));
          break;

        case ST_FORM_MODEL_TYPEAHEAD:
          formModel.push(new StFormModelTypeahead(model, layout));
          break;

        case ST_FORM_MODEL_DATETIME:
          formModel.push(new StFormModelDateTime(model, layout));
          break;

        case ST_FORM_MODEL_IMAGE_UPLOAD:
          formModel.push(new StFormModelImageUpload(model, layout));
          break;

        case ST_FORM_MODEL_CKEDITOR:
          formModel.push(new StFormModelCkeditor(model, layout));
          break;

        case ST_FORM_MODEL_BIRTHDAY:
          formModel.push(new StFormModelBirthday(model, layout));
          break;

        default:
          throw new Error(`unknown form control model type defined on JSON object with id "${model.id}" and type "${model.type}"`);
      }
    });

    return formModel;
  }
}
