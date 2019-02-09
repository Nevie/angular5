import { Component, OnInit } from '@angular/core';
import {AuthService} from '../news/services/authService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private auth: AuthService) { }

}
