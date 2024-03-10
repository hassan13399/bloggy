import { DynamicInputModel, DynamicInputModelConfig, DynamicFormControlLayout } from '@ng-dynamic-forms/core';
import { serializable } from '@ng-dynamic-forms/core';

export const ST_FORM_MODEL_DATETIME = 'ST_DATETIME';
export interface StDateTimeModelConfig extends DynamicInputModelConfig {

  test: string;
  /*
  dataSource?: string;
  targetModel: string;
  searchField: string;
  */
}

export class StFormModelDateTime extends DynamicInputModel {

  /*
  @serializable() dataSource: string;
  @serializable() targetModel: string;
  @serializable() searchField: string;
  */
  @serializable() readonly type: string = ST_FORM_MODEL_DATETIME;

  constructor(config: StDateTimeModelConfig, layout?: DynamicFormControlLayout) {

    super(config, layout);

    /*
    this.dataSource = typeof config.dataSource === "string" ? config.dataSource : null;
    this.targetModel = typeof config.targetModel === "string" ? config.targetModel : null;
    this.searchField = typeof config.searchField === "string" ? config.searchField : null;
    */
  }
}