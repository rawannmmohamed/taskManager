import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: false,

  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  email: string = '';
  password: string = '';
  role: 'user' = 'user';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password || !this.role) {
      console.log('Validation failed: One or more fields are empty');
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.authService.signup(this.email, this.password, this.role).subscribe({
      next: (user) => {
        if (user) {
          this.router.navigate([`dashboard`]);
        }
      },
      error: (error) => {
        this.errorMessage = `${error}`;
      },
    });
  }
}
