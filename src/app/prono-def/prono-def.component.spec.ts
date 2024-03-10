import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PronoDefComponent } from './prono-def.component';

describe('PronoDefComponent', () => {
  let component: PronoDefComponent;
  let fixture: ComponentFixture<PronoDefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PronoDefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PronoDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
