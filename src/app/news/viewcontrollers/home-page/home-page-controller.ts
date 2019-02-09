import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NewsService} from '../../services/news-service';
import {ResponceModel} from '../../models/ResponceModel';
import {NewsItem} from '../../models/NewsItem';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page-controller.html',
  styleUrls: ['./home-page-controller.css']
})
export class HomePageController implements OnInit {
  newsList: NewsItem[];
  private numberNews: number = 5;

  constructor(private  router: Router,
              private newsService: NewsService) {
  }

  ngOnInit() {
    this.getHeroes();
  }

  addArticleSelected() {
    this.router.navigate(['/create']);
  }

  search(term) {

  }

  getHeroes(): void {
    this.newsService.getNews().subscribe((data: ResponceModel) => {
      if (data && data.articles) {
        this.newsList = data.articles.sort(() => .5 - Math.random()).slice(0, this.numberNews);
      }
    });
  }

  getDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

  editNews(id: number) {
    this.router.navigate(['/edit', id]);
  }

  deleteNews(news: NewsItem) {
    console.log('Delete news');
  }
}
