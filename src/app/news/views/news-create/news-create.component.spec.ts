import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {NewsCreateComponent} from './news-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SpyLocation} from '@angular/common/testing';
import {Location} from '@angular/common';
import {NewsService} from '../../services/newsService';

describe('NewsCreateComponent', () => {
  let component: NewsCreateComponent;
  let fixture: ComponentFixture<NewsCreateComponent>;
  let newsService;
  let comp;
  const newsServiceStub = {
    addNews(news) {
      return true;
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [NewsCreateComponent],
      providers: [
        {provide: Location, useClass: SpyLocation},
        {provide: NewsService, useValue: newsServiceStub},
        NewsCreateComponent
      ]
    })
      .compileComponents();
    newsService = TestBed.get(NewsService);
    comp = TestBed.get(NewsCreateComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('save should be called', async(async () => {
    spyOn(newsService, 'addNews');
    comp.save({});
    fixture.detectChanges();
    expect(newsService.addNews).toHaveBeenCalled();
  }));
  it('should call  location.back")', inject([Location], (loc: Location) => {
    spyOn(loc, 'back');
    comp.goBack();
    expect(loc.back).toHaveBeenCalledTimes(1);
  }));
});
