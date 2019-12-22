import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  private sessionUser;
   constructor(public router: Router, private authService: AuthService) {
   localStorage.removeItem('currentUser');
   localStorage.clear();
   sessionStorage.clear();
   this.authService.logout();
   this.router.navigate(['/']);
  }

  ngOnInit() {
  }

}
