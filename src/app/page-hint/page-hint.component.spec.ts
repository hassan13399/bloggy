import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHintComponent } from './page-hint.component';

describe('PageHintComponent', () => {
  let component: PageHintComponent;
  let fixture: ComponentFixture<PageHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageHintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
