import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../../services/news-service';
import {Location} from '@angular/common';
import {NewsItem} from '../../models/NewsItem';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent {
  public news: NewsItem;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private location: Location
  ) {
    this.news = new NewsItem();
  }

  save(): void {
    console.log(this.news);
    this.news.publishedAt = new Date(Date.now());
    console.log(this.news.publishedAt);
    this.newsService.updateNews(this.news);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
