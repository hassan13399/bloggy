import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGroupCreateComponent } from './page-group-create.component';

describe('PageGroupCreateComponent', () => {
  let component: PageGroupCreateComponent;
  let fixture: ComponentFixture<PageGroupCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageGroupCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
