import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';
import { HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doc-registration',
  templateUrl: './doc-registration.component.html',
  styles: []
})
export class DocRegistrationComponent implements OnInit {
  submitted = false;
  preview: string;
  form: FormGroup;
  percentDone: any = 0;
  users = [];

  widthShort = { width: '50%' }

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public fileUploadService: FileUploadService
  ) {
    // Reactive Form
    this.form = this.fb.group({
      name: ['', Validators.required],
      avatar: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      specialist: ['', Validators.required]
    });
  }

  ngOnInit() { }

  // Image Preview
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  get f() { return this.form.controls; }
  submitForm() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.fileUploadService.addUser(
      this.form.value.name,
      this.form.value.avatar,
      this.form.value.email,
      this.form.value.phone,
      this.form.value.city,
      this.form.value.password,
      this.form.value.specialist,
      1
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.percentDone = false;
          this.router.navigate(['login']);
      }
    }, (error: HttpErrorResponse) => {
      Swal.fire('Oops...', error.error, 'error');
      console.log('error comes' + error.error); // body
    });
  }

}
