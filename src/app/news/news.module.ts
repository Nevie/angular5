import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsEditComponent} from './views/news-edit/news-edit.component';
import {NewsDetailsComponent} from './views/news-details/news-details.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {NewsSearchComponent} from './views/news-search/news-search.component';
import {MockDataService} from './services/mock-data-service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomePageController} from './viewcontrollers/home-page/home-page-controller';
import {FormsModule} from '@angular/forms';
import {NewsCreateComponent} from './views/news-create/news-create.component';

@NgModule({
  declarations: [
    NewsEditComponent,
    NewsDetailsComponent,
    DashboardComponent,
    NewsSearchComponent,
    NewsCreateComponent,
    HomePageController
  ],
  providers: [
    MockDataService
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserAnimationsModule
  ]
})
export class NewsModule { }
