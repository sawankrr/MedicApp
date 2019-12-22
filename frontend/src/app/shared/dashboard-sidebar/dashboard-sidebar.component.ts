import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent implements OnInit {
  private currentUser: BehaviorSubject<User>;
  private sessionUser;
  constructor(private authService: AuthService) {
    this.currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // this.sessionUser = JSON.stringify(sessionStorage.getItem('sessionUser'));
    this.sessionUser = JSON.parse( sessionStorage.getItem('sessionUser') );
    console.log(this.sessionUser);

    // console.table(this.currentUser.value);
  }

  ngOnInit() {
  }
  onLogout() {
    this.authService.logout();
  }
}
