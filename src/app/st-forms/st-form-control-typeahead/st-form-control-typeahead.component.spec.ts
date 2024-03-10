import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StFormControlTypeaheadComponent } from './st-form-control-typeahead.component';

describe('StFormControlTypeaheadComponent', () => {
  let component: StFormControlTypeaheadComponent;
  let fixture: ComponentFixture<StFormControlTypeaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StFormControlTypeaheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StFormControlTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
