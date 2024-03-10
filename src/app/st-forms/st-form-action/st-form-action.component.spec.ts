import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StFormActionComponent } from './st-form-action.component';

describe('StFormActionComponent', () => {
  let component: StFormActionComponent;
  let fixture: ComponentFixture<StFormActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StFormActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StFormActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
