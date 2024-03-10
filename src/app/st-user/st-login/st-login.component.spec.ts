import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StLoginComponent } from './st-login.component';

describe('StLoginComponent', () => {
  let component: StLoginComponent;
  let fixture: ComponentFixture<StLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
