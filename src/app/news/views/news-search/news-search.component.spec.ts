import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {NewsSearchComponent} from './news-search.component';
import {FormsModule} from '@angular/forms';
import {SearchService} from '../../services/searchService';
import {NewsService} from '../../services/newsService';
import {ChannelsService} from '../../services/channelsService';
import {CustomNewsService} from '../../services/customNewsService';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {defer} from 'rxjs';


describe('NewsSearchComponent', () => {
  let component: NewsSearchComponent;
  let fixture: ComponentFixture<NewsSearchComponent>;
  let comp: any;
  const chanelList = [1, 2];
  let channelsService;
  let customNewsService;
  let searchService;

  function fakeAsyncResponse<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }

  const newsServiceStub = {
    getChannels() {
      return fakeAsyncResponse({sources: chanelList});
    }
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [NewsSearchComponent],
      providers: [
        {provide: NewsService, useValue: newsServiceStub},
        NewsSearchComponent,
        SearchService,
        ChannelsService,
        CustomNewsService
      ]
    })
      .compileComponents();
    comp = TestBed.get(NewsSearchComponent);

    // Services provided to the TestBed
    channelsService = TestBed.get(ChannelsService);
    customNewsService = TestBed.get(CustomNewsService);
    searchService = TestBed.get(SearchService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getChannels should be called', async(async () => {
    comp.ngOnInit();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(comp.channelList).toBe(chanelList);
  }));

  it('channelSelected should be called', fakeAsync(async () => {
    const chanel = {id: 'chanelName', name: 'channel name'};
    spyOn(channelsService, 'chanelSelectedChanged');
    comp.channelSelected(chanel);
    fixture.detectChanges();
    expect(channelsService.chanelSelectedChanged).toHaveBeenCalled();
    expect(comp.selectedChannel).toBe(chanel);
  }));

  it('getCustom should be called', fakeAsync(async () => {
    const state = false;
    spyOn(customNewsService, 'customNewsStateChanged');
    comp.getCustom(state);
    fixture.detectChanges();
    expect(customNewsService.customNewsStateChanged).toHaveBeenCalledWith(state);
  }));

  it('search should be called', fakeAsync(async () => {
    const term = 'test String';
    spyOn(searchService, 'searchTermChanged');
    comp.search(term);
    fixture.detectChanges();
    expect(searchService.searchTermChanged).toHaveBeenCalledWith(term);
  }));

  it('should emit addArticleSelected event', (done) => {
    component.addArticleSelected.subscribe(g => {
      expect(g).toBeUndefined();
      done();
    });
    component.addArticle();
  });
});
