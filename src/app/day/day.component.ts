import { Component, OnInit, ViewChild } from '@angular/core';
import { StDataGridComponent } from '../st-forms/st-data-grid/st-data-grid.component';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  stDataGridConfig = {
    displayFields: ['id', 'label']
  };

  @ViewChild(StDataGridComponent) stDataGridComponent: StDataGridComponent;

  constructor() {

  }

  ngOnInit() {

  }
}
