import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Add this import

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListeCandidaturesComponent } from './components/liste-candidatures/liste-candidatures.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { CandidatureFiltreesComponent } from './components/candidature-filtrees/candidature-filtrees.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './components/calendar/calendar.component'; // Import du module

@NgModule({
  declarations: [
    AppComponent,
    ListeCandidaturesComponent,
    LoginComponent,
    NavbarComponent,
    CandidatureFiltreesComponent,
    NotFoundComponent,
    CalendarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule 

  ],
  providers: [AuthService], // Add AuthService to providers
  bootstrap: [AppComponent]
})
export class AppModule { }
