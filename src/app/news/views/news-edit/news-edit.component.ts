import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../../services/news-service';
import {NewsItem} from '../../models/NewsItem';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
    @Input() news: NewsItem;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.newsService.getNewsById(id)
      .subscribe(hero => this.news = hero);
  }

  save(): void {
    this.newsService.updateNews(this.news)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
