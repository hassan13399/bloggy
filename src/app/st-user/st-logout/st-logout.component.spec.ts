import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StLogoutComponent } from './st-logout.component';

describe('StLogoutComponent', () => {
  let component: StLogoutComponent;
  let fixture: ComponentFixture<StLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
