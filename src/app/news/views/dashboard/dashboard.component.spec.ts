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
});
