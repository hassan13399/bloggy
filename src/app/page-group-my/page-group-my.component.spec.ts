import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGroupMyComponent } from './page-group-my.component';

describe('PageGroupMyComponent', () => {
  let component: PageGroupMyComponent;
  let fixture: ComponentFixture<PageGroupMyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageGroupMyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGroupMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
