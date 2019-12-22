import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';



@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  private currentUser: BehaviorSubject<User>;
  private sessionUser;
  appointments: any = [];
  appointmentsByDate: any = [];
  cs = 'Pending';
  constructor(public router: Router, private patientService : PatientService) {
    this.currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.sessionUser = JSON.parse( sessionStorage.getItem('sessionUser') );
    // console.log(this.sessionUser);
    if(this.sessionUser === 'null'){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.patientService.getAllAppointment(this.sessionUser._id).subscribe((resp) => {
      if (resp !== null) { this.appointments = resp; }
      });

    this.patientService.getAllAppointmentByDate(this.sessionUser._id, '22_12_2019').subscribe((resp) => {
        if (resp !== null) { this.appointmentsByDate = resp; console.log('getAllAppointmentByDate'+this.sessionUser._id);
        console.table(this.appointmentsByDate);
      }
        });
  }
  getDateTime(data){
    return Number(data) < 6 ? data + ' PM' :  data + ' AM';
  }
  accept(aptId){
    console.log(aptId);
    this.patientService.updateAppointmentStatus(aptId, 'Accepted').subscribe((resp) => {
      if (resp !== null) { console.log(resp);
                           this.patientService.getAllAppointment(this.sessionUser._id).subscribe((resp) => {
          if (resp !== null) { this.appointments = resp; }
          });
         }
      });
  }
  reject(aptId){
    console.log(aptId);
    this.patientService.updateAppointmentStatus(aptId, 'Rejected').subscribe((resp) => {
      if (resp !== null) { console.log(resp);
        this.patientService.getAllAppointment(this.sessionUser._id).subscribe((resp) => {
          if (resp !== null) { this.appointments = resp; }
          });
      }
      });
  }
}
