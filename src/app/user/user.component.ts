import { Component, OnInit, ViewChild } from '@angular/core';
import { StDataGridComponent } from '../st-forms/st-data-grid/st-data-grid.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  stM2mConfig;
  stDataGridConfig = {
    displayFields: ['id', 'username', 'name']
  };

  @ViewChild(StDataGridComponent) stDataGridComponent: StDataGridComponent;

  constructor() {
    this.stM2mConfig = {
      m2mSourceField: 'user_id', // id of the main object for which we want the relation
      sourceModel: 'user', // name of the source model
      m2mModel: 'userGroup', // name of the "m2m model"
      targetTable: 'groups', // name of the "target table"
      targetModel: 'group', // name of the "target table"
      searchField: 'name', // name of the "target table"
      m2mTargetField: 'group_id' // name of the "target field"
    };
  }

  ngOnInit() {

  }
}