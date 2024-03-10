import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePartnerComponent } from './page-partner.component';

describe('PagePartnerComponent', () => {
  let component: PagePartnerComponent;
  let fixture: ComponentFixture<PagePartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
