import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';

declare var $: any;
// tslint:disable-next-line: one-variable-per-declaration
let appointmentDate, appointmentTime;
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  doctor: any;
  aryDates: any;
  doctorId;
  appointments: any;
  apt: any;
  private currentUser: BehaviorSubject<User>;
  private sessionUser;
  constructor(private doctorService: DoctorService , private route: ActivatedRoute,
              private router: Router, private patientService: PatientService) {
    this.currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.sessionUser = JSON.parse( sessionStorage.getItem('sessionUser') );

  }



  ngOnInit() {
    const startDate = new Date();
    // this.aryDates = this.GetDates(startDate, 6);
    // console.log(this.aryDates);
    this.route.paramMap.subscribe(params => {
      // console.log(params.get('id'));
      this.doctorService.getUser(params.get('doctorId')).subscribe(c => {
          // console.log(c);
          this.doctorId = params.get('doctorId');
          this.doctor = c.users;
        });
      this.patientService.getAppointmentForDoctor(params.get('doctorId')).subscribe(c => {

          this.apt = c.user;
          this.aryDates = this.getDatesWithBookings(startDate, 6, this.apt);
          console.log('getAppointmentForDoctor');
          console.log(this.apt);
          console.log(this.aryDates);
        });
      });
    // console.log('ngoninit appointment '+this.appointments.message);
    // tslint:disable-next-line: only-arrow-functions
    $('.apttime').each(function() {
      $('.' + $(this).val()).addClass('booked');

    });

    $(document).on('click','.booked', function(){
      Swal.fire('ERROR','Appointment for date & time already booked.','error');
      $(this).removeClass('selected');
    });
       // tslint:disable-next-line: only-arrow-functions
    $(document).on('click', '.timing', function() {
        $('.timing').removeClass('selected');
        $(this).addClass('selected');
        appointmentDate = $(this).data('book-date');
        appointmentTime = $(this).data('book-time');
    });
  }

bookAppointment(){

      const selectedTime = $('.selected').attr('class');
      console.log(selectedTime);
      if (selectedTime.search('booked') > -1) {
        Swal.fire('ERROR', 'Appointment for date & time already booked.', 'error');
        return;
      }

      //  console.log(appointmentDate + ' ' + appointmentTime + ' ' + this.sessionUser._id+ ' Pending' + this.doctorId );
      this.patientService.bookAppointment(this.sessionUser._id,
        this.doctorId, appointmentDate, appointmentTime, 'Pending', '').subscribe((resp) => {
          if (resp.message === '') {
            Swal.fire('ERROR', resp.message, 'error');
          } else {
            Swal.fire({
              title: 'SUCCESS',
              text: 'Booking Confirmed',
              icon: 'success',
              showCancelButton: false,
            }).then((result) => {
              this.router.navigate(['patient-dashboard']);
            });
          }
        });
  }
GetDates(startDate, daysToAdd) {
    const aryDates = [];
    for (let i = 0; i <= daysToAdd; i++) {
        const currentDate = new Date();
        currentDate.setDate(startDate.getDate() + i);
        // tslint:disable-next-line: max-line-length
        aryDates.push(this.DayAsString(currentDate.getDay()) + ',' + currentDate.getDate() + '/' + this.MonthAsString(currentDate.getMonth()) + '/' + currentDate.getFullYear());
    }
    return aryDates;
}

checkIfBookingExists(bookingDate, bookingTime, bookingArray){
  const mergeBookingDateTime = bookingDate + bookingTime;
  var k = 0;
  bookingArray.forEach(element => {

    if(element.bookingtime == mergeBookingDateTime){
      console.log(element.bookingtime + ' == '+  mergeBookingDateTime);
      k++;
    }
  });

  return (k>0);

}

getDatesWithBookings(startDate, daysToAdd,bookingDateArray) {
  const aryDates = [];
  for (let i = 0; i <= daysToAdd; i++) {
      const currentDate = new Date();
      currentDate.setDate(startDate.getDate() + i);

      let timeArray = new Array();
      // tslint:disable-next-line: max-line-length
    let myDate = currentDate.getDate() + '/' + this.MonthAsString(currentDate.getMonth()) + '/' + currentDate.getFullYear();
      for(let j=9; j<=16;j++){
       var isBook = this.checkIfBookingExists(myDate,j,bookingDateArray);
        let timeBookObj = {"time":j,"isBook":isBook};
        // timeBookObj.time = j;
        // timeBookObj.isBook = isBook;
        timeArray.push(timeBookObj);
      }


      var dateTxt = this.DayAsString(currentDate.getDay());
      var onlyDate = currentDate.getDate() + '/' + this.MonthAsString(currentDate.getMonth()) + '/' + currentDate.getFullYear();
      var aryDatesObj = {"dateTxt":dateTxt,"timeArray":timeArray,"onlyDate":onlyDate};
      aryDates.push(aryDatesObj);
  }
  return aryDates;
}

MonthAsString(monthIndex) {
  let month = new Array();
  month[0] = '01';
  month[1] = '02';
  month[2] = '03';
  month[3] = '04';
  month[4] = '05';
  month[5] = '06';
  month[6] = '07';
  month[7] = '08';
  month[8] = '09';
  month[9] = '10';
  month[10] = '11';
  month[11] = '12';
  return month[monthIndex];
}

DayAsString(dayIndex) {
  let weekdays = new Array(7);
  weekdays[0] = 'Sunday';
  weekdays[1] = 'Monday';
  weekdays[2] = 'Tuesday';
  weekdays[3] = 'Wednesday';
  weekdays[4] = 'Thursday';
  weekdays[5] = 'Friday';
  weekdays[6] = 'Saturday';
  return weekdays[dayIndex];
}




}
