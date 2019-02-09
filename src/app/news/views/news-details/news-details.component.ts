import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../../services/news-service';
import {Location} from '@angular/common';
import {NewsItem} from '../../models/NewsItem';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})

export class NewsDetailsComponent implements OnInit {
  @Input() news: NewsItem;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.newsService.getNewsById(id)
      .subscribe(news => this.news = news);
  }

  goBack(): void {
    this.location.back();
  }

  editNews() {
    console.log('Edit News clicked');
  }

  deleteNews() {
    console.log('Delete News clicked');
  }

}
