import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDetailsComponent } from './news-details.component';
import {RouterModule} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NewsService} from '../../services/newsService';
import {SpyLocation} from '@angular/common/testing';
import {Location} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';

describe('NewsDetailsComponent', () => {
  let component: NewsDetailsComponent;
  let fixture: ComponentFixture<NewsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
      ],
      declarations: [ NewsDetailsComponent ],
      providers: [
        NewsService,
        {provide: Location, useClass: SpyLocation}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
