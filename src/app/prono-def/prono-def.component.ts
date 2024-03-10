import { Component, OnInit, ViewChild } from '@angular/core';
import { StDataGridComponent } from '../st-forms/st-data-grid/st-data-grid.component';

@Component({
  selector: 'app-prono-def',
  templateUrl: './prono-def.component.html',
  styleUrls: ['./prono-def.component.scss']
})

export class PronoDefComponent implements OnInit {
  stDataGridConfig = {
    displayFields: ['id']
  };

  @ViewChild(StDataGridComponent) stDataGridComponent: StDataGridComponent;

  model;

  constructor() {

  }

  ngOnInit() {

  }
}
