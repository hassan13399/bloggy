import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGeneralActiveComponent } from './page-general-active.component';

describe('PageGeneralActiveComponent', () => {
  let component: PageGeneralActiveComponent;
  let fixture: ComponentFixture<PageGeneralActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageGeneralActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGeneralActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
