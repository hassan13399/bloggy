import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StFormControlDateTimeComponent } from './st-form-control-date-time.component';

describe('StFormControlDateTimeComponent', () => {
  let component: StFormControlDateTimeComponent;
  let fixture: ComponentFixture<StFormControlDateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StFormControlDateTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StFormControlDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
