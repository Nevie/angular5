import {Observable} from 'rxjs';
import data from '../data/news.json';

export class MockDataService {
  constructor() {
  }

  public getNews(): Observable<any> {
    return new Observable((observer) => {
      observer.next(data);
      observer.complete();
    });
  }

  public search(term): Observable<any> {
    return new Observable((observer) => {
      observer.next(data);
      observer.complete();
    });
  }

  public getNewsById(id): Observable<any> {
    return new Observable((observer) => {
      const item = data.articles.find(item => {
        return item.source.id == id;
      });
      observer.next(item);
      observer.complete();
    });
  }
}
