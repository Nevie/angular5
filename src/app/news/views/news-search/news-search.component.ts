import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {NewsService} from '../../services/news-service';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import {NewsItem} from '../../models/NewsItem';

@Component({
  selector: 'app-news-search',
  templateUrl: './news-search.component.html',
  styleUrls: ['./news-search.component.css']
})
export class NewsSearchComponent implements OnInit {

  @Output() addArticleSelected: EventEmitter<any> = new EventEmitter();
  @Output() searchEmitted: EventEmitter<any> = new EventEmitter();

  newsList$: Observable<NewsItem[]>;
  private searchTerms = new Subject<string>();

  constructor(private newsService: NewsService) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.newsList$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.newsService.searchNews(term)),
    );
  }

  addArticle() {
    this.addArticleSelected.emit();
  }
}
