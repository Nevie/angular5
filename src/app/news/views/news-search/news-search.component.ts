import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {NewsService} from '../../services/newsService';
import {SearchService} from '../../services/searchService';
import {ChannelsResponseModel} from '../../models/ChannelsResponseModel';
import {ChannelsService} from '../../services/channelsService';
import {ChannelsModel} from '../../models/ChannelsModel';
import {CustomNewsService} from '../../services/customNewsService';

@Component({
  selector: 'app-news-search',
  templateUrl: './news-search.component.html',
  styleUrls: ['./news-search.component.css']
})
export class NewsSearchComponent implements OnInit {
  public channelList: any[];
  public selectedChannel: ChannelsModel;
  public isChecked: boolean = false;
  @Output() addArticleSelected: EventEmitter<any> = new EventEmitter();

  constructor(private newsService: NewsService,
              private searchService: SearchService,
              private channelsService: ChannelsService,
              private customNewsService: CustomNewsService) {
    this.selectedChannel = {
      id: 'abc-news',
      name: 'ABC News'
    };
  }

  ngOnInit() {
    this.channelsService.chanelSelected.next(this.selectedChannel);

    this.newsService.getChannels().subscribe((data: ChannelsResponseModel) => {
      this.channelList = data.sources;
    }, (error) => console.log(error));
  }

  channelSelected(chanel: ChannelsModel) {
    this.selectedChannel = chanel;
    this.channelsService.chanelSelectedChanged(chanel);
  }

  getCustom(state) {
    this.customNewsService.customNewsStateChanged(state);
  }

  search(term: string): void {
    this.searchService.searchTermChanged(term);
  }

  addArticle() {
    this.addArticleSelected.emit();
  }
}
