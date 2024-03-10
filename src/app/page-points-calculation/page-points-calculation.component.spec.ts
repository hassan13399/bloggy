import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePointsCalculationComponent } from './page-points-calculation.component';

describe('PagePointsCalculationComponent', () => {
  let component: PagePointsCalculationComponent;
  let fixture: ComponentFixture<PagePointsCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePointsCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePointsCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
