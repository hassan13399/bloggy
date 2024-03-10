import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StModalComponent } from './st-modal.component';

describe('StModalComponent', () => {
  let component: StModalComponent;
  let fixture: ComponentFixture<StModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
