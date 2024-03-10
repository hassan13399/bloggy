import { DynamicInputModel, DynamicInputModelConfig, DynamicFormControlLayout } from '@ng-dynamic-forms/core';
import { serializable } from '@ng-dynamic-forms/core';

export const ST_FORM_MODEL_IMAGE_UPLOAD = 'ST_IMAGE_UPLOAD';
export interface StImageUploadModelConfig extends DynamicInputModelConfig {

  test: string;
  /*
  dataSource?: string;
  targetModel: string;
  searchField: string;
  */
}

export class StFormModelImageUpload extends DynamicInputModel {

  /*
  @serializable() dataSource: string;
  @serializable() targetModel: string;
  @serializable() searchField: string;
  */
  @serializable() readonly type: string = ST_FORM_MODEL_IMAGE_UPLOAD;

  constructor(config: StImageUploadModelConfig, layout?: DynamicFormControlLayout) {

    super(config, layout);

    /*
    this.dataSource = typeof config.dataSource === "string" ? config.dataSource : null;
    this.targetModel = typeof config.targetModel === "string" ? config.targetModel : null;
    this.searchField = typeof config.searchField === "string" ? config.searchField : null;
    */
  }
}