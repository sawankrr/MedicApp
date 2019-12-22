import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(public fb: FormBuilder,
              public router: Router,
              public loginService: LoginService,
              private authService: AuthService) {
                this.loginForm = this.fb.group({
                  email: ['', [Validators.required, Validators.email]],
                  password: ['', [Validators.required, Validators.minLength(6)]]
                });
    }




  ngOnInit() {

  }

  get f() { return this.loginForm.controls; }
  submitForm() {
    this.submitted = true;
    if (this.loginForm.invalid) {
            return;
        }
    this.loginService.checkUserLogin(
      this.loginForm.value.email,
      this.loginForm.value.password)
    .subscribe((event: HttpEvent<any>) => {
      localStorage.setItem('currentUser', JSON.stringify(event));
      console.log(JSON.stringify(event));
      sessionStorage.setItem('sessionUser', JSON.stringify(event));
      // tslint:disable-next-line: no-string-literal
      if( event['usertype'] === 1 ) {
        this.authService.login();
        this.router.navigate(['doctor-dashboard']);
      // tslint:disable-next-line: no-string-literal
      } else if (event['usertype'] === 2){
        this.authService.login();
        this.router.navigate(['patient-dashboard']);
      }
    }, (error: HttpErrorResponse) => {
      Swal.fire('Oops...', 'Username/ Password combination wrong', 'error');
    });
  }


}
