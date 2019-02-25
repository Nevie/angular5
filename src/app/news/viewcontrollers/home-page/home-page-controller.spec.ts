import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePageController} from './home-page-controller';
import {DashboardComponent} from '../../views/dashboard/dashboard.component';
import {NewsSearchComponent} from '../../views/news-search/news-search.component';
import {SearchService} from '../../services/searchService';
import {FormsModule} from '@angular/forms';
import {FilterNewsByTitlePipe} from '../../../helpers/filterNewsByTitle.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ChannelsService} from '../../services/channelsService';
import {CustomNewsService} from '../../services/customNewsService';

describe('HomePageComponent', () => {
  let component: HomePageController;
  let fixture: ComponentFixture<HomePageController>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        HomePageController,
        NewsSearchComponent,
        DashboardComponent,
        FilterNewsByTitlePipe
      ],
      providers: [
        SearchService,
        ChannelsService,
        CustomNewsService
      ]
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
