import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: User[] = [];

  error = "";
  success = ""
  

  seedDB() {
    this._authService.getUsers().subscribe(
      res => this.users = res,
      err => console.log(err)
    );
  }

  delete(id) {
    this._authService.deleteUser(id).subscribe(
      res => this.users = res,
      err => this.error = err.error
    )
  }

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.getUsers().subscribe(
      res => this.users = res,
      err => console.log(err)
    );
  }

}
