import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './pages/registration/registration.component';
import { DocRegistrationComponent } from './pages/doc-registration/doc-registration.component';
import { LoginComponent } from './pages/login/login.component';
import { DoctorDashboardComponent } from './pages/doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard.component';
import { LogoutComponent } from './shared/logout/logout.component';
import { SearchDoctorComponent } from './pages/search-doctor/search-doctor.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'patient-registration' },
  { path: 'patient-registration', component: RegistrationComponent },
  { path: 'doctor-registration', component: DocRegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'doctor-dashboard', component: DoctorDashboardComponent },
  { path: 'patient-dashboard', component: PatientDashboardComponent },
  { path: 'logout', component: LogoutComponent},
  { path: 'search-doctor', component: SearchDoctorComponent},
  { path: 'book-appointment/:doctorId', component: AppointmentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
