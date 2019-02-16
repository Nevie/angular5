import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '../../services/newsService';
import {Location} from '@angular/common';
import {NewsItem} from '../../models/NewsItem';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})

export class NewsDetailsComponent implements OnInit {
  @Input() news: any;
  public customNews: boolean;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private location: Location,
    private  router: Router
  ) {
  }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    const id = this.route.snapshot.queryParams['id'];
    if (id) {
      this.customNews = true;
      this.newsService.getNewsById(id)
        .subscribe(news => this.news = news);
    } else {
      this.customNews = false;
      const term = this.route.snapshot.queryParams['term'];
      this.newsService.getNewsByTerm(term)
        .subscribe(news => this.news = news.articles[0]);
    }
  }

  goBack(): void {
    this.location.back();
  }

  editNews(id: string) {
    this.router.navigate(['news/edit', id]);
  }

  deleteNews() {
    this.newsService.deleteNews(this.news._id).subscribe(() => {
      this.location.back();
    });
  }

}
