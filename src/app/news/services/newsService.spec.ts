import {TestBed, getTestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NewsService} from './newsService';
import {MessageService} from '../../helpers/message-service';
import * as appConfig from '../../apiConfig.json';

describe('NewsService', () => {
  let injector: TestBed;
  let service: NewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NewsService,
        MessageService
      ]
    });
    injector = getTestBed();
    service = injector.get(NewsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#GET requests', () => {
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

    it('getNews should return an Observable<NewsResponseModel[]>', () => {
      service.getNews().subscribe(news => {
        expect(news.articles).toBe(dummyNews.articles);
        expect(news.articles.length).toBe(1);
        expect(news).toEqual(dummyNews);
      });

      const path = `${appConfig.apiUrl}/top-headlines?sources=bbc-news&apiKey=${appConfig.apiKey}`;
      const req = httpMock.expectOne(path);

      expect(req.request.method).toBe('GET');
      req.flush(dummyNews);
    });

    it('getNewsByTerm should return an Observable<NewsResponseModel[]>', () => {
      const term: string = 'bbc-news';
      service.getNewsByTerm(term).subscribe(news => {
        expect(news.articles).toBe(dummyNews.articles);
        expect(news.articles.length).toBe(1);
        expect(news).toEqual(dummyNews);
      });

      const path = `${appConfig.apiUrl}/top-headlines?q=${term}&apiKey=${appConfig.apiKey}`;
      const req = httpMock.expectOne(path);

      expect(req.request.method).toBe('GET');
      req.flush(dummyNews);
    });

    it('getNewsById should return an Observable<NewsItem>', () => {
      const id: string = '1';
      service.getNewsById(id).subscribe(news => {
        expect(news.id).toBe(dummyNews.articles[0].id);
        expect(news).toEqual(dummyNews.articles[0]);
      });

      const path = `${appConfig.server}/${id}`;
      const req = httpMock.expectOne(path);

      expect(req.request.method).toBe('GET');
      req.flush(dummyNews.articles[0]);
    });

    it('addNews should return an Observable', () => {
      spyOn(service, 'log');
      service.addNews(dummyNews.articles[0]);
      expect(service.log).toHaveBeenCalled();
    });

  });
});
