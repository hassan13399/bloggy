import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StFormControlBirthdayComponent } from './st-form-control-birthday.component';

describe('StFormControlBirthdayComponent', () => {
  let component: StFormControlBirthdayComponent;
  let fixture: ComponentFixture<StFormControlBirthdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StFormControlBirthdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StFormControlBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
