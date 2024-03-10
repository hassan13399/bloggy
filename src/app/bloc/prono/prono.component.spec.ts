import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PronoComponent } from './prono.component';

describe('PronoComponent', () => {
  let component: PronoComponent;
  let fixture: ComponentFixture<PronoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PronoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PronoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
