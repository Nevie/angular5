import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {FilterNewsByTitlePipe} from '../../../helpers/filterNewsByTitle.pipe';
import {SearchService} from '../../services/searchService';
import {ChannelsService} from '../../services/channelsService';
import {CustomNewsService} from '../../services/customNewsService';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        FilterNewsByTitlePipe],
      providers: [
        SearchService,
        ChannelsService,
        CustomNewsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    const chanel = {id: 'abc-news', name: 'ABC News'};
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.searchTerm).toEqual('');
  });

  it('should emit getDetailsEmitted event', (done) => {
    component.getDetailsEmitted.subscribe(g => {
      expect(g).toEqual({name: 'test'});
      done();
    });
    component.getDetails({name: 'test'});
  });

  it('should emit editNews event', (done) => {
    component.editNewsEmitted.subscribe(g => {
      expect(g).toEqual(1);
      done();
    });
    component.editNews(1);
  });

  it('should emit getNews event', (done) => {
    component.getNewsEmitted.subscribe(g => {
      expect(g).toBeUndefined();
      done();
    });
    component.getNews();
  });

  it('should emit deleteNews event', (done) => {
    const news = {
      id: 1,
      author: 'Author',
      title: 'title',
      description: 'description',
      url: 'url',
      urlToImage: 'urlToImage',
      content: 'content',
      publishedAt: null
    };
    component.deleteNewsEmitted.subscribe(g => {
      expect(g).toEqual(news);
      done();
    });
    component.deleteNews( news);
  });
});
