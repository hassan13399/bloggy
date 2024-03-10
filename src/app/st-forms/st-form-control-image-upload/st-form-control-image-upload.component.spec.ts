import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StFormControlImageUploadComponent } from './st-form-control-image-upload.component';

describe('StFormControlImageUploadComponent', () => {
  let component: StFormControlImageUploadComponent;
  let fixture: ComponentFixture<StFormControlImageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StFormControlImageUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StFormControlImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
