import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StDataGridComponent } from './st-data-grid.component';

describe('StDataGridComponent', () => {
  let component: StDataGridComponent;
  let fixture: ComponentFixture<StDataGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StDataGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
