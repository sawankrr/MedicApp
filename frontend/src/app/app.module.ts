import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { DocRegistrationComponent } from './pages/doc-registration/doc-registration.component';
import { LoginComponent } from './pages/login/login.component';
import { DoctorDashboardComponent } from './pages/doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard.component';
import { UserMenuComponent } from './shared/user-menu/user-menu.component';
import { DashboardSidebarComponent } from './shared/dashboard-sidebar/dashboard-sidebar.component';
import { LogoutComponent } from './shared/logout/logout.component';
import { SearchDoctorComponent } from './pages/search-doctor/search-doctor.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { StorageServiceModule} from 'angular-webstorage-service';
import { ReplacePipe } from './pipes/replace.pipe';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegistrationComponent,
    DocRegistrationComponent,
    LoginComponent,
    DoctorDashboardComponent,
    PatientDashboardComponent,
    UserMenuComponent,
    DashboardSidebarComponent,
    LogoutComponent,
    SearchDoctorComponent,
    AppointmentComponent,
    ReplacePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StorageServiceModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
