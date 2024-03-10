import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFormuleComponent } from './page-formule.component';

describe('PageFormuleComponent', () => {
  let component: PageFormuleComponent;
  let fixture: ComponentFixture<PageFormuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFormuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFormuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
