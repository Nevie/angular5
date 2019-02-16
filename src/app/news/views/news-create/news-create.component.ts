import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../../services/newsService';
import {Location} from '@angular/common';
import {NewsItem} from '../../models/NewsItem';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent {
  public news: NewsItem;
  newsForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.news = new NewsItem();
    this.createForm();
  }

  createForm() {
    this.newsForm = new FormGroup({
      author: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      urlToImage: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });
  }

  save(data): void {
    debugger;
    this.news = data;
    this.news.publishedAt = new Date(Date.now());
    this.newsService.addNews(this.news);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
