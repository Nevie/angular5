import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageController } from './home-page-controller';

describe('HomePageComponent', () => {
  let component: HomePageController;
  let fixture: ComponentFixture<HomePageController>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageController ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
