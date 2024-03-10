import { Component, OnInit, ViewChild } from '@angular/core';
import { StDataGridComponent } from '../st-forms/st-data-grid/st-data-grid.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})

export class TeamComponent implements OnInit {
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


