import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsEditComponent} from './news/views/news-edit/news-edit.component';
import {NewsDetailsComponent} from './news/views/news-details/news-details.component';
import {HomePageController} from './news/viewcontrollers/home-page/home-page-controller';
import {NewsCreateComponent} from './news/views/news-create/news-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: HomePageController  },
  { path: 'news/details', component: NewsDetailsComponent },
  { path: 'news/edit/:id', component: NewsEditComponent },
  { path: 'news/create', component: NewsCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
