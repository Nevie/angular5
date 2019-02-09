import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MockDataService} from './mock-data-service';
import {MessageService} from '../../helpers/message-service';
import {ResponceModel} from '../models/ResponceModel';
import {NewsItem} from '../models/NewsItem';


@Injectable({providedIn: 'root'})
export class NewsService {
  constructor(private mockDataService: MockDataService,
              private messageService: MessageService) {
  }

  getNews(): Observable<ResponceModel> {
    console.log('NewsService: getNews');
    this.log(`NewsService: getNews`);
    return this.mockDataService.getNews();
  }

  getNewsById(id: number): Observable<NewsItem> {
    console.log('NewsService: getNews by id');
    this.log(`NewsService: getNews by id`);
    return this.mockDataService.getNewsById(id);
  }

  searchNews(term: string): Observable<NewsItem[]> {
    console.log('searchNews');
    return this.mockDataService.search(term);
  }

  loadMore(): Observable<NewsItem[]> {
    return this.mockDataService.getNews();
  }

  addNews(news: NewsItem): Observable<NewsItem> {
    console.log('NewsService: addNews');
    this.log(`NewsService: addNews by id`);
    return null;
  }

  deleteNews(news: NewsItem | number): Observable<ResponceModel> {
    const id = typeof news === 'number' ? news : news.id;
    console.log('NewsService: deleteNews');
    this.log(`NewsService: deleteNews`);
    return null;

  }

  updateNews(news: NewsItem): Observable<any> {
    console.log('NewsService: updateNews');
    this.log(`NewsService: updateNews`);
    return null;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`NewsService: ${message}`);
  }
}
