import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {NewsDetailsComponent} from './news-details.component';
import {RouterModule} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NewsService} from '../../services/newsService';
import {SpyLocation} from '@angular/common/testing';
import {Location} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {defer, of} from 'rxjs';

describe('NewsDetailsComponent', () => {
  let component: NewsDetailsComponent;
  let fixture: ComponentFixture<NewsDetailsComponent>;
  let comp: any;
  let newsService;
  const news = {
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
    getNewsById(id) {
      return fakeAsyncResponse(news.articles);
    },
    getNewsByTerm(term) {
      return fakeAsyncResponse(news);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
      ],
      declarations: [NewsDetailsComponent],
      providers: [
        NewsDetailsComponent,
        {provide: Location, useClass: SpyLocation},
        {provide: NewsService, useValue: newsServiceStub},
      ]
    })
      .compileComponents();
    newsService = TestBed.get(NewsService);
    comp = TestBed.get(NewsDetailsComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call  location.back")', inject([Location], (loc: Location) => {
    spyOn(loc, 'back');
    comp.goBack();
    expect(loc.back).toHaveBeenCalledTimes(1);
  }));
  it('getNews should be called', async(async () => {
    spyOn(newsService, 'getNewsByTerm').and.returnValue(of(news));
    comp.getNews();
    fixture.detectChanges();
    expect(comp.news).toEqual(news.articles[0]);
  }));
});
