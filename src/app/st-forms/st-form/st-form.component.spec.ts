import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StFormComponent } from './st-form.component';

describe('StFormComponent', () => {
  let component: StFormComponent;
  let fixture: ComponentFixture<StFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
