import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StFormControlCkeditorComponent } from './st-form-control-ckeditor.component';

describe('StFormControlCkeditorComponent', () => {
  let component: StFormControlCkeditorComponent;
  let fixture: ComponentFixture<StFormControlCkeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StFormControlCkeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StFormControlCkeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
