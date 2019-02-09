import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth-guard/auth-guard';
import {AuthService} from '../news/services/authService';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRippleModule} from '@angular/material';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatRippleModule,
    LoginComponent
  ],
  providers: [AuthGuard, AuthService],
})
export class AuthModule { }
