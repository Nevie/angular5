import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { NewsSearchComponent } from './news-search.component';
import {FormsModule} from '@angular/forms';
import {SearchService} from '../../services/searchService';
import {NewsService} from '../../services/newsService';
import {ChannelsService} from '../../services/channelsService';
import {CustomNewsService} from '../../services/customNewsService';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('NewsSearchComponent', () => {
  let component: NewsSearchComponent;
  let fixture: ComponentFixture<NewsSearchComponent>;
  let spy: any;
  let newsService: NewsService;
  let comp: any;
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [ NewsSearchComponent ],
      providers: [
        NewsSearchComponent,
        SearchService,
        ChannelsService,
        CustomNewsService
      ]
    })
    .compileComponents();
    comp = TestBed.get(NewsSearchComponent);
    newsService = TestBed.get(NewsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 /* it('getChannels should be called', () => {
    debugger;

    spy = spyOn(newsService, 'getChannels').and.returnValue([]);
    comp.ngOnInit();
    tick();
    expect(newsService.getChannels).toHaveBeenCalled();
  });*/
});
