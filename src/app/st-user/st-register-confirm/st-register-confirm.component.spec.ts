import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StRegisterConfirmComponent } from './st-register-confirm.component';

describe('StRegisterConfirmComponent', () => {
  let component: StRegisterConfirmComponent;
  let fixture: ComponentFixture<StRegisterConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StRegisterConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StRegisterConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
