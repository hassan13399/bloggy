import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNextMatchComponent } from './home-next-match.component';

describe('HomeNextMatchComponent', () => {
  let component: HomeNextMatchComponent;
  let fixture: ComponentFixture<HomeNextMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeNextMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeNextMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
