import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingCalculationComponent } from './ranking-calculation.component';

describe('RankingCalculationComponent', () => {
  let component: RankingCalculationComponent;
  let fixture: ComponentFixture<RankingCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
