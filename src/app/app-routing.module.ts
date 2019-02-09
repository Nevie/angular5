import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsEditComponent} from './news/views/news-edit/news-edit.component';
import {NewsDetailsComponent} from './news/views/news-details/news-details.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuard} from './auth/auth-guard/auth-guard';
import {HomePageController} from './news/viewcontrollers/home-page/home-page-controller';
import {NewsCreateComponent} from './news/views/news-create/news-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: HomePageController  },
  { path: 'details/:id', component: NewsDetailsComponent },
  { path: 'edit/:id', component: NewsEditComponent/* , canActivate: [AuthGuard]*/ },
  { path: 'create', component: NewsCreateComponent},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
