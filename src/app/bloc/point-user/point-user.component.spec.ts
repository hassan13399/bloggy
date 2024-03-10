import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointUserComponent } from './point-user.component';

describe('PointUserComponent', () => {
  let component: PointUserComponent;
  let fixture: ComponentFixture<PointUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
