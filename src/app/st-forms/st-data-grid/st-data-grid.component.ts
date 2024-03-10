import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DynamicFormLayout} from '@ng-dynamic-forms/core';
import { StRemoteDataService } from '../st-remote-data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

export interface StDataGridConfig {
  displayFields; // list of fields to display in list
}

@Component({
  selector: 'st-data-grid',
  templateUrl: './st-data-grid.component.html',
  styleUrls: ['./st-data-grid.component.scss']
})
export class StDataGridComponent implements OnInit, AfterViewInit  {

  @Input() model;
  @Input() jsonModel;
  @Input() stDataGridConfig;

  item: {id: number,
    data: any,
    displayForm: boolean,
    formComponent} | null = null;
  items: Array<{id: number,
    data: any,
    displayForm: boolean,
    formComponent}> = [];
  count = 0;
  formLayout: DynamicFormLayout;
  modalRef;
  deleteIndex; // index of the element to be delete (after open of Modal)
  currentPage = 1;
  itemsPerPage = 10;
  display = 'list';
  displayFields: {};

  @ViewChild('stFormActionEdit') stFormActionComponent;

  constructor(private remoteService: StRemoteDataService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.displayFields = this.stDataGridConfig.displayFields;
    this.loadItems(1);
  }

  ngAfterViewInit() {
    //console.log(this.stFormActionComponent);
  }

  protected loadItems(page) {
    const offset = this.itemsPerPage * (page - 1);
    this.remoteService.getList(this.model, offset, this.itemsPerPage)
      .subscribe(data => {
        this.count = data['count'];
        this.currentPage = page;
        this.initItems(data['rows']);
      });
  }

  protected initItems(data) {
    this.items = [];
    for (let index = 0; index < data.length; index++) {
      this.items.push({
        id: data[index].id,
        data: data[index],
        displayForm: false,
        formComponent: null
      });
    }
  }

  edit(index: number): void {
    this.display = 'edit';
    this.item = this.items[index].data;
  }

  create(): void {
    this.item = null;
    this.display = 'new';
    // this.stFormActionComponent.reset();
  }

  afterSave($event) {
    this.loadItems(1);
    this.display = 'list';
  }

  onPageChanged(page) {
    this.loadItems(page);
  }

  deleteFromModal() {
    this.remoteService.delete(this.items[this.deleteIndex].id, this.model)
      .subscribe(data => {
        this.items.splice(this.deleteIndex, 1);
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