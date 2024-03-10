import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGroupInviteComponent } from './page-group-invite.component';

describe('PageGroupInviteComponent', () => {
  let component: PageGroupInviteComponent;
  let fixture: ComponentFixture<PageGroupInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageGroupInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGroupInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
