import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MessageService} from '../../helpers/message-service';
import {NewsResponseModel} from '../models/NewsResponseModel';
import {NewsItem} from '../models/NewsItem';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import * as appConfig from '../../apiConfig.json';
import {ChannelsResponseModel} from '../models/ChannelsResponseModel';

@Injectable({providedIn: 'root'})
export class NewsService {

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  getNews(chanel: string = 'bbc-news'): Observable<NewsResponseModel> {
    this.log(`NewsService: getNews`);
    const path = `${appConfig.apiUrl}/top-headlines?sources=${chanel}&apiKey=${appConfig.apiKey}`;

    return this.http.get<NewsResponseModel>(path)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  getNewsByTerm(term: string = 'bbc-news'): Observable<NewsResponseModel> {
    this.log(`NewsService: getNews`);
    const path = `${appConfig.apiUrl}/top-headlines?q=${term}&apiKey=${appConfig.apiKey}`;

    return this.http.get<NewsResponseModel>(path)
      .pipe(
        map((response: any) => {
          debugger
          return response;
        })
      );
  }

  getChannels(): Observable<ChannelsResponseModel> {
    this.log(`NewsService: getNews`);
    const path = `${appConfig.apiUrl}/sources?apiKey=${appConfig.apiKey}`;
    return this.http.get<ChannelsResponseModel>(path)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getNewsById(id: string): any {
    this.log(`NewsService: getNews by id`);
    this.log(`NewsService: getCustomNews`);
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get<NewsItem>(`${appConfig.server}/${id}`, httpOptions);
  }

  addNews(obj: NewsItem) {
    this.log(`NewsService: addNews`);
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': '*'
      })
    };
    this.http.post<NewsItem>(`${appConfig.server}/add`, obj, httpOptions);
  }

  getCustomNews(): any {
    this.log(`NewsService: getCustomNews`);
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get<NewsItem>(`${appConfig.server}`, httpOptions);
  }

  deleteNews(newsId: string): Observable<any> {
    this.log(`NewsService: deleteNews`);
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'DELETE',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.delete(`${appConfig.server}/${newsId}`, httpOptions);

  }

  updateNews(news: NewsItem): Observable<any> {
    this.log(`NewsService: updateNews`);
    this.log(`NewsService: addNews`);
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'PUT',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.put<NewsItem>(`${appConfig.server}/${news.id}`, news, httpOptions);
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
