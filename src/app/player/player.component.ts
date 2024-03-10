import { Component, OnInit, ViewChild } from '@angular/core';
import { StDataGridComponent } from '../st-forms/st-data-grid/st-data-grid.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {
  stDataGridConfig = {
    displayFields: ['id', 'name']
  };

  @ViewChild(StDataGridComponent) stDataGridComponent: StDataGridComponent;

  model;

  constructor() {

  }

  ngOnInit() {

  }
}
