import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGroupMyActiveComponent } from './page-group-my-active.component';

describe('PageGroupMyActiveComponent', () => {
  let component: PageGroupMyActiveComponent;
  let fixture: ComponentFixture<PageGroupMyActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageGroupMyActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGroupMyActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
