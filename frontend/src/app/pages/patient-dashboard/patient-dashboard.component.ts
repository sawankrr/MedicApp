import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
  appointments: any = [];
  private sessionUser;
  constructor(private patientService: PatientService, private router: Router) {
    this.sessionUser = JSON.parse( sessionStorage.getItem('sessionUser') );
    if(this.sessionUser === null){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {

    this.patientService.getAppointment(this.sessionUser._id).subscribe((resp) => {
      console.table(resp[0].appointment_book[0].name);
      if (resp !== null) { this.appointments = resp; }
      });
  }
  parseInt(data){
    return Number(data) < 6 ? data + ' PM' :  data + ' AM';
  }

}
