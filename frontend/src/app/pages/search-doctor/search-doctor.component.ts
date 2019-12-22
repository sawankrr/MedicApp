import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-search-doctor',
  templateUrl: './search-doctor.component.html',
  styleUrls: ['./search-doctor.component.css']
})
export class SearchDoctorComponent implements OnInit {
  specialist: any = [];
  doctors: any = [];
  private sessionUser;
  constructor(private doctorService: DoctorService, private router: Router) {
    this.sessionUser = JSON.parse( sessionStorage.getItem('sessionUser') );
    if(this.sessionUser === null){
      this.router.navigate(['/login']);
    }
   }

  ngOnInit() {
    $(document).on('click','input[type="checkbox"]', function(){
     const relData = $(this).data('rel');
     if($(this).is(':checked')){
        $('.' + relData).show(100);
      } else {
        $('.' + relData).hide(100);
      }
    });
    this.doctorService.getSpecialisation().subscribe((resp) => {
      console.table(resp);
      if (resp !== null) { this.specialist = resp; }
      });
    this.doctorService.getDoctors().subscribe((resp) => {
        console.log(resp);
        this.doctors = resp.users;
        });
  }

}
