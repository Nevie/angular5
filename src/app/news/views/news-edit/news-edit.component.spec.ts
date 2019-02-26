import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {Location} from '@angular/common';
import {NewsEditComponent} from './news-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NewsService} from '../../services/newsService';
import {defer, of} from 'rxjs';
import {SpyLocation} from '@angular/common/testing';

describe('NewsEditComponent', () => {
  let component: NewsEditComponent;
  let fixture: ComponentFixture<NewsEditComponent>;
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
    updateNews(term) {
      return true;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {provide: Location, useClass: SpyLocation},
        {provide: NewsService, useValue: newsServiceStub},
      ],
      declarations: [NewsEditComponent]
    })
      .compileComponents();

    newsService = TestBed.get(NewsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('getNews should be called', async(async () => {
    spyOn(newsService, 'getNewsById').and.returnValue(of(news.articles[0]));
    component.getNews();
    fixture.detectChanges();
    expect(component.dataExist).toEqual(true);
  }));
  it('save should be called', async(async () => {
    spyOn(newsService, 'updateNews').and.returnValue(of(news.articles[0]));
    component.save(news.articles[0]);
    fixture.detectChanges();
    expect(newsService.updateNews).toHaveBeenCalled();
  }));
  it('should createForm', () => {
    component.createForm(news.articles[0]);
    fixture.detectChanges();
    expect(component.newsForm).not.toBeNull();
  });

  it('should call  location.back")', inject([Location], (loc: Location) => {
    spyOn(loc, 'back');
    component.goBack();
    expect(loc.back).toHaveBeenCalledTimes(1);
  }));
});
