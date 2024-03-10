import { Component, OnInit, ViewChild } from '@angular/core';
import { StDataGridComponent } from '../st-forms/st-data-grid/st-data-grid.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})

export class GroupComponent implements OnInit {
  stM2mConfig;
  stDataGridConfig = {
    displayFields: ['id', 'name']
  };

  @ViewChild(StDataGridComponent) stDataGridComponent: StDataGridComponent;

  constructor() {
    this.stM2mConfig = {
      m2mSourceField: 'group_id', // id of the main object for which we want the relation
      sourceModel: 'group', // name of the source model
      targetModel: 'user', // targetModel
      m2mModel: 'userGroup', // name of the "m2m model"
      targetTable: 'users', // name of the "target table"
      m2mTargetField: 'user_id', // name of the "target field"
      searchField: 'name' // name of the target field for search
    };
  }

  ngOnInit() {

  }
}
