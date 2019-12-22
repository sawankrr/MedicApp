import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  sessionUser: any;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {
    this.sessionUser = JSON.parse( sessionStorage.getItem('sessionUser') );
  }

  login() {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }

  logout() {
    this.loggedIn.next(false);
    sessionStorage.removeItem('currentUser');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  isLogInUser(){
    if (this.sessionUser === ''){
      return true;
    }
    return false;
  }

}
