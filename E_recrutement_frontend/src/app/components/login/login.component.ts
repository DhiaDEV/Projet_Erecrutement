import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Update the path if necessary

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailInput: string = '';
  passwordInput: string = '';
  submitted: boolean = false;

  emailError: string | null = null;
  passwordError: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.emailError = null;
    this.passwordError = null;

    // Vérification de l'email
    if (!this.emailInput) {
      this.emailError = 'Ladresse email est requise.';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.emailInput)) {
      this.emailError = 'Ladresse email n est pas valide.';
    }

    // Vérification du mot de passe
    if (!this.passwordInput) {
      this.passwordError = 'Le mot de passe est requis.';
    }

    // Si les champs sont valides, appeler le service d'authentification
    if (!this.emailError && !this.passwordError) {
      this.authService.login(this.emailInput, this.passwordInput).subscribe(
        (response) => {
          console.log('Connexion réussie', response);
          this.router.navigate(['/list']);
        },
        (error) => {
          console.error('Erreur de connexion:', error);
          this.emailError = 'Email ou mot de passe incorrect.';
          this.passwordError = 'Email ou mot de passe incorrect.';
        }
      );
    }
  }

  clearError(field: string) {
    if (field === 'email') {
      this.emailError = null;
    } else if (field === 'password') {
      this.passwordError = null;
    }
  }
}
