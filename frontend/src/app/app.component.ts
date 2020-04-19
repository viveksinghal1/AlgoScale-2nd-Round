import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username = "";

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this.username = localStorage.getItem("username");
  }
}
