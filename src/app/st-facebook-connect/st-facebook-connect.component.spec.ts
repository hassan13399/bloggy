import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StFacebookConnectComponent } from './st-facebook-connect.component';

describe('StFacebookConnectComponent', () => {
  let component: StFacebookConnectComponent;
  let fixture: ComponentFixture<StFacebookConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StFacebookConnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StFacebookConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
