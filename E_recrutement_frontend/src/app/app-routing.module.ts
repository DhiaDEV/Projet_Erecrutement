import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListeCandidaturesComponent } from './components/liste-candidatures/liste-candidatures.component';
import { CandidatureFiltreesComponent } from './components/candidature-filtrees/candidature-filtrees.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'list', component: ListeCandidaturesComponent },
  { path: 'list-filtree', component: CandidatureFiltreesComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private authService: AuthService, private router: Router) {
    this.redirectUser();
  }

  private redirectUser(): void {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
    } 
  }
}
