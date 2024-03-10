import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePronoComponent } from './page-prono.component';

describe('PagePronoComponent', () => {
  let component: PagePronoComponent;
  let fixture: ComponentFixture<PagePronoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePronoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePronoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
