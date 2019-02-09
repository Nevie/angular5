import {Source} from './Source';

export class NewsItem {
  id: number;
  source?: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  content: string;
  publishedAt: Date;

  constructor() {
    this.id = Math.floor(Math.random() * (100000 - 20 + 1)) + 20;
    this.author = '';
    this.title = '';
    this.description = '';
    this.url = '';
    this.urlToImage = '';
    this.publishedAt = new Date(Date.now());
    this.content = '';
  }
}
