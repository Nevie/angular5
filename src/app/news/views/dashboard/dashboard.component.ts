import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NewsItem} from '../../models/NewsItem';
import {SearchService} from '../../services/searchService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() newsList: NewsItem[];
  @Output() getDetailsEmitted: EventEmitter<any> = new EventEmitter();
  @Output() getNewsEmitted: EventEmitter<any> = new EventEmitter();
  @Output() editNewsEmitted: EventEmitter<any> = new EventEmitter();
  @Output() deleteNewsEmitted: EventEmitter<any> = new EventEmitter();
  searchTerm: string = '';

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.searchService.searchTerm.subscribe(value => {
      this.searchTerm = value;
    });
  }

  getNews(): void {
    this.getNewsEmitted.emit();
  }

  getDetails(news) {
    this.getDetailsEmitted.emit(news);
  }

  editNews(id: number) {
    this.editNewsEmitted.emit(id);
  }

  deleteNews(news: NewsItem) {
    this.deleteNewsEmitted.emit(news);
  }
}
