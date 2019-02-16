import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {NewsService} from '../../services/newsService';
import {NewsResponseModel} from '../../models/NewsResponseModel';
import {NewsItem} from '../../models/NewsItem';
import {ChannelsService} from '../../services/channelsService';
import {Shuffle} from '../../../helpers/shuffleArray';
import {ConverterToCustomModel} from '../../../helpers/convertToCustomModel';
import {CustomNewsService} from '../../services/customNewsService';
import {ChannelsModel} from '../../models/ChannelsModel';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page-controller.html',
  styleUrls: ['./home-page-controller.css']
})
export class HomePageController implements OnInit {
  newsList: NewsItem[] = [];

  private limitNewsEachCategory: number = 5;
  private customNewsLimit: number = 10;
  public channel: ChannelsModel;

  constructor(private  router: Router,
              private newsService: NewsService,
              private channelsService: ChannelsService,
              private customNewsService: CustomNewsService) {
  }

  ngOnInit() {
    this.channelsService.chanelSelected.subscribe(channel => {
      this.channel = channel;
      this.getNews(channel.id);
    });
    this.customNewsService.customNews.subscribe(state => {
      if (state) {
        this.newsList = [];
        this.getCustomNews(this.customNewsLimit);
      } else {
        this.getNews();
      }
    });
  }

  addArticleSelected() {
    this.router.navigate(['news/create']);
  }

  getNews(chanel: string = this.channel.id): void {
    debugger
    this.newsList = [];
    this.getNewsFromPublicSite(chanel);
    this.getCustomNews();
  }

  private getNewsFromPublicSite(chanel: string) {
    this.newsService.getNews(chanel).subscribe((data: NewsResponseModel) => {
        if (data && data.articles) {
          const newsList = data.articles.sort(() => .5 - Math.random()).slice(0, this.limitNewsEachCategory);
          this.newsList = Shuffle.shuffleArray(this.newsList.concat(ConverterToCustomModel.Convert(newsList, false)));
        }
      },
      (error) => console.log(error)
    );
  }

  private getCustomNews(limit: number = this.limitNewsEachCategory) {
    this.newsService.getCustomNews().subscribe((data: NewsItem[]) => {
      if (data) {
        const newsList = data.sort(() => .5 - Math.random()).slice(0, limit);
        this.newsList = Shuffle.shuffleArray(this.newsList.concat(ConverterToCustomModel.Convert(newsList, true)));
      }
    }, (error) => console.log(error));
  }

  getDetails(news) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'id': news._id,
        'term': news.title
      }
    };

    this.router.navigate(['news/details'], navigationExtras);
  }

  editNews(id: number) {
    this.router.navigate(['news/edit', id]);
  }

  deleteNews(news) {
    this.newsService.deleteNews(news._id).subscribe(() => {
      this.getNews();
    });
  }
}
