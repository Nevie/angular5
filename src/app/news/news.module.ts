import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsEditComponent} from './views/news-edit/news-edit.component';
import {NewsDetailsComponent} from './views/news-details/news-details.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {NewsSearchComponent} from './views/news-search/news-search.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomePageController} from './viewcontrollers/home-page/home-page-controller';
import {FormsModule} from '@angular/forms';
import {NewsCreateComponent} from './views/news-create/news-create.component';
import {SearchService} from './services/searchService';
import {FilterNewsByTitlePipe} from '../helpers/filterNewsByTitle.pipe';
import {HttpClientModule} from '@angular/common/http';
import {ChannelsService} from './services/channelsService';
import {  ReactiveFormsModule } from '@angular/forms';
import {CustomNewsService} from './services/customNewsService';
@NgModule({
  declarations: [
    NewsEditComponent,
    NewsDetailsComponent,
    DashboardComponent,
    NewsSearchComponent,
    NewsCreateComponent,
    HomePageController,
    FilterNewsByTitlePipe
  ],
  providers: [
    SearchService,
    ChannelsService,
    CustomNewsService
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule
  ]
})
export class NewsModule { }
