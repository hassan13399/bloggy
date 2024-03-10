import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StResetPasswordComponent } from './st-reset-password.component';

describe('StResetPasswordComponent', () => {
  let component: StResetPasswordComponent;
  let fixture: ComponentFixture<StResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
