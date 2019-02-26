import {async, ComponentFixture, fakeAsync, inject, TestBed} from '@angular/core/testing';

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
import {defer, of} from 'rxjs';
import {NewsService} from '../../services/newsService';
import {Router} from '@angular/router';

class MockRouter {
  navigate(url: string) {
    return url;
  }
}

describe('HomePageComponent', () => {
  let component: HomePageController;
  let fixture: ComponentFixture<HomePageController>;
  const chanelList = [1, 2];
  let channelsService;
  let customNewsService;
  let searchService;
  let newsService;
  let comp: any;
  const dummyNews = {
    articles: [
      {
        id: 1,
        author: 'Author',
        title: 'title',
        description: 'description',
        url: 'url',
        urlToImage: 'urlToImage',
        content: 'content',
        publishedAt: null
      }
    ]
  };

  function fakeAsyncResponse<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }

  const newsServiceStub = {
    getChannels() {
      return fakeAsyncResponse({sources: chanelList});
    },
    getNews(channel) {
      return fakeAsyncResponse(dummyNews);
    },
    getCustomNews() {
      return fakeAsyncResponse(dummyNews.articles);
    },
    deleteNews(news) {
      return true;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        HomePageController,
        NewsSearchComponent,
        DashboardComponent,
        FilterNewsByTitlePipe
      ],
      providers: [
        {provide: NewsService, useValue: newsServiceStub},
        {provide: Router, useClass: MockRouter},
        SearchService,
        HomePageController,
        ChannelsService,
        CustomNewsService
      ]
    })
      .compileComponents();
    comp = TestBed.get(HomePageController);

    // Services provided to the TestBed
    channelsService = TestBed.get(ChannelsService);
    newsService = TestBed.get(NewsService);
    customNewsService = TestBed.get(CustomNewsService);
    searchService = TestBed.get(SearchService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageController);
    component = fixture.componentInstance;

  });
  describe('#work with data', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('getNews should be called', async(async () => {
      const chanel = {id: 'chanelName', name: 'channel name'};
      spyOn(comp, 'getNewsFromPublicSite');
      spyOn(comp, 'getCustomNews');
      comp.getNews(chanel);
      fixture.detectChanges();

      expect(comp.newsList).toEqual([]);
      expect(comp.getCustomNews).toHaveBeenCalled();
      expect(comp.getNewsFromPublicSite).toHaveBeenCalledWith(chanel);
    }));

    it('getNewsFromPublicSite should be called', async(async () => {
      const chanel = {id: 'chanelName', name: 'channel name'};
      spyOn(newsService, 'getNews').and.returnValue(of(dummyNews));
      comp.getNewsFromPublicSite(chanel);
      fixture.detectChanges();
      expect(newsService.getNews).toHaveBeenCalledWith(chanel);
    }));

    it('getCustomNews should be called', async(async () => {
      spyOn(newsService, 'getCustomNews').and.returnValue(of(dummyNews.articles));
      comp.getCustomNews();
      fixture.detectChanges();
      expect(newsService.getCustomNews).toHaveBeenCalled();
      expect(comp.newsList).toEqual(dummyNews.articles);
    }));

    it('deleteNews should be called', async(async () => {
      spyOn(newsService, 'deleteNews').and.returnValue(of(dummyNews.articles));
      comp.channel = {id: 'chanelName', name: 'channel name'};
      comp.deleteNews({_id: '1'});
      fixture.detectChanges();
      expect(newsService.deleteNews).toHaveBeenCalled();
    }));
  });

  describe('#navigate to other pages', () => {
    it('should call Router.navigate("news/details")', inject([Router], (router: Router) => {
      const spy = spyOn(router, 'navigate');
      comp.getDetails({});
      const url = spy.calls.first().args[0];
      expect(url).toEqual(['news/details']);
    }));
    it('should call Router.navigate("news/edit")', inject([Router], (router: Router) => {
      const spy = spyOn(router, 'navigate');
      comp.editNews(1);
      const url = spy.calls.first().args[0];
      expect(url).toEqual(['news/edit', 1]);
    }));
  });
});
