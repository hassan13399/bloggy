import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StCreateUserComponent } from './st-create-user.component';

describe('StCreateUserComponent', () => {
  let component: StCreateUserComponent;
  let fixture: ComponentFixture<StCreateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StCreateUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StCreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
