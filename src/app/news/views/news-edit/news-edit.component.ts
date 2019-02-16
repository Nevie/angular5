import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../../services/newsService';
import {NewsItem} from '../../models/NewsItem';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  @Input() news: NewsItem;

  newsForm: FormGroup;
  dataExist: boolean = false;

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
    const id = this.route.snapshot.paramMap.get('id');
    this.newsService.getNewsById(id)
      .subscribe(hero => {
          this.dataExist = true;
          this.createForm(hero);
        }
      )
    ;
  }

  save(data: NewsItem): void {
    data.publishedAt = new Date(Date.now());
    this.newsService.updateNews(data)
      .subscribe(() => this.goBack());
  }

  createForm(news) {
    this.newsForm = new FormGroup({
      author: new FormControl(news.author, Validators.required),
      title: new FormControl(news.title, Validators.required),
      description: new FormControl(news.description, Validators.required),
      url: new FormControl(news.url, Validators.required),
      urlToImage: new FormControl(news.urlToImage, Validators.required),
      content: new FormControl(news.content, Validators.required),
      id: new FormControl(news._id)
    });
  }

  goBack(): void {
    this.location.back();
  }
}
