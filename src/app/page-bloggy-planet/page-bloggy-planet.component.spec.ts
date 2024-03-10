import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBloggyPlanetComponent } from './page-bloggy-planet.component';

describe('PageBloggyPlanetComponent', () => {
  let component: PageBloggyPlanetComponent;
  let fixture: ComponentFixture<PageBloggyPlanetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBloggyPlanetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBloggyPlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
