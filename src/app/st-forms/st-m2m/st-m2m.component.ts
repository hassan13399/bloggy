import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { StFormService } from '../st-form.service';
import { StRemoteDataService } from '../st-remote-data.service';
import { DynamicFormLayout} from '@ng-dynamic-forms/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

export interface StM2mConfig {
  m2mSourceField: string; // id of the main object for which we want the relation
  sourceModel: string; // name of the source model
  m2mModel: string; // name of the "m2m model"
  targetTable: string; // name of the "target table"
  targetModel: string; // name of the "target model"
  m2mTargetField: string; // name of the "target field",
  searchField: string; // search field in the target table
}

@Component({
  selector: 'st-m2m',
  templateUrl: './st-m2m.component.html',
  styleUrls: ['./st-m2m.component.scss']
})

export class StM2mComponent implements OnInit, AfterViewInit  {

  @Input() stM2mConfig: StM2mConfig; // config of the m2m
  @Input() sourceId: number; // id of the main object for which we want the relation

  m2mSourceField: string;
  m2mTargetField: string;
  sourceModel: string;
  targetTable: string;
  searchField: string;
  targetModel: string;
  m2mModel: string;

  objectModel =
    [{
      type: 'ST_TYPEAHEAD',
      id: 'm2m',
      label: 'Name',
      maxLength: 42,
      placeholder: 'Name',
    }];
  item;
  items;

  formLayout: DynamicFormLayout;
  modalRef;
  deleteIndex; // index of the element to be delete (after open of Modal)

  @ViewChild('m2mStForm') stFormComponent;

  constructor(private remoteService: StRemoteDataService, private stFormService: StFormService, private modalService: NgbModal) {
    //const formModel = this.stFormService.fromJSON(model);
  }

  ngOnInit() {
    this.m2mSourceField = this.stM2mConfig.m2mSourceField;
    this.sourceModel = this.stM2mConfig.sourceModel;
    this.targetTable = this.stM2mConfig.targetTable;
    this.m2mTargetField = this.stM2mConfig.m2mTargetField;
    this.searchField = this.stM2mConfig.searchField;
    this.targetModel = this.stM2mConfig.targetModel;
    this.m2mTargetField = this.stM2mConfig.m2mTargetField;
    this.m2mModel = this.stM2mConfig.m2mModel;

    this.objectModel[0]['searchField'] = this.searchField;
    this.objectModel[0]['targetModel'] = this.targetModel;

    // console.log('M2M config', this.stM2mConfig);
    // console.log('M2M objectModel', this.objectModel);

    this.init();
  }

  ngAfterViewInit() {
    //console.log(this.stFormActionComponent);
  }

  init() {
    this.loadItems();
  }

  protected loadItems() {
    this.remoteService.getM2m(this.sourceModel, this.sourceId)
      .subscribe(data => {
        // console.log('M2M list data', data);
        this.items = data[0][this.targetTable];
      });
  }

  edit(index: number): void {
    this.item = this.items[index].data;
  }

  create(): void {
    const inputValues = this.stFormComponent.formGroup.value;

    const values = {};
    values[this.m2mSourceField] = this.sourceId;
    values[this.m2mTargetField] = inputValues['m2m'].id;

    this.remoteService.create(values, this.m2mModel)
      .subscribe(data => {
        this.loadItems();
        this.stFormComponent.formGroup.reset();
      });
  }

  deleteFromModal() {
    this.remoteService.deleteM2m(this.m2mModel, this.m2mSourceField, this.sourceId, this.m2mTargetField, this.items[this.deleteIndex].id )
      .subscribe(data => {
        this.loadItems();
        this.modalRef.close();
      });
  }

  openModal(content, index) {
    this.deleteIndex = index;
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      //this.modalRef = null;
      this.deleteIndex = null;
    });
  }
}