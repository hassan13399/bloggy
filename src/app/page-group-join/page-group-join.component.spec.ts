import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGroupJoinComponent } from './page-group-join.component';

describe('PageGroupJoinComponent', () => {
  let component: PageGroupJoinComponent;
  let fixture: ComponentFixture<PageGroupJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageGroupJoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGroupJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
