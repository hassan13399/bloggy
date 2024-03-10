import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Level2MenuComponent } from './level2-menu.component';

describe('Level2MenuComponent', () => {
  let component: Level2MenuComponent;
  let fixture: ComponentFixture<Level2MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level2MenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level2MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
