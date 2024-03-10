import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StFormControlComponent } from './st-form-control.component';

describe('StFormControlComponent', () => {
  let component: StFormControlComponent;
  let fixture: ComponentFixture<StFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
