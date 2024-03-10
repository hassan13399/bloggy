import { Component, OnInit, ViewChild } from '@angular/core';
import { StDataGridComponent } from '../st-forms/st-data-grid/st-data-grid.component';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.scss']
})

export class PhaseComponent implements OnInit {
  stDataGridConfig = {
    displayFields: ['id', 'name_fr']
  };

  @ViewChild(StDataGridComponent) stDataGridComponent: StDataGridComponent;

  model;

  constructor() {

  }

  ngOnInit() {

  }
}
