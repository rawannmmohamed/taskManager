import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: (user) => {
          if (!user) {
            this.errorMessage = 'Invalid email or password';
          } else {
            this.router.navigate(['dashboard']);
          }
        },
        error: () => {
          this.errorMessage = 'An error occurred during login';
        },
      });
    }
  }
}
