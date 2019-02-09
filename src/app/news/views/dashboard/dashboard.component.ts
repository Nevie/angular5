import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NewsItem} from '../../models/NewsItem';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @Input() newsList: NewsItem[];
  @Output() getDetailsEmitted: EventEmitter<any> = new EventEmitter();
  @Output() getHeroesEmitted: EventEmitter<any> = new EventEmitter();
  @Output() editNewsEmitted: EventEmitter<any> = new EventEmitter();
  @Output() deleteNewsEmitted: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  getHeroes(): void {
   this.getHeroesEmitted.emit();
  }

  getDetails(id: number) {
    this.getDetailsEmitted.emit(id);
  }

  editNews(id: number) {
    this.editNewsEmitted.emit(id);
  }

  deleteNews(news: NewsItem) {
    this.deleteNewsEmitted.emit(news);
  }
}
