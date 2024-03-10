import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseMenuComponent } from './phase-menu.component';

describe('PhaseMenuComponent', () => {
  let component: PhaseMenuComponent;
  let fixture: ComponentFixture<PhaseMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
