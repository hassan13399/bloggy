import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StM2mComponent } from './st-m2m.component';

describe('StM2mComponent', () => {
  let component: StM2mComponent;
  let fixture: ComponentFixture<StM2mComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StM2mComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StM2mComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
