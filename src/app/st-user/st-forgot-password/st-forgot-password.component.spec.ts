import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StForgotPasswordComponent } from './st-forgot-password.component';

describe('StForgotPasswordComponent', () => {
  let component: StForgotPasswordComponent;
  let fixture: ComponentFixture<StForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
