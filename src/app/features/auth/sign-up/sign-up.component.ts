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
  role:  'user' = 'user';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log('Signup form submitted');
  
    if (!this.email || !this.password || !this.role) {
      console.log('Validation failed: One or more fields are empty');
      this.errorMessage = 'Please fill in all fields';
      return;
    }
  
    console.log('Checking if email already exists:', this.email);
  
    this.authService.checkEmailExists(this.email).subscribe((emailExists) => {
      if (emailExists) {
        console.log('Email already exists');
        this.errorMessage = 'This email is already registered';
        return;
      }
  
      console.log('Email does not exist, proceeding with signup');
      
      this.authService.signup(this.email, this.password, this.role).subscribe({
        next: (user) => {
          console.log('User signed up successfully:', user);
          if (user) {
            this.router.navigate([`dashboard/${user.role}`]);
          }
        },
        error: (error) => {
          this.errorMessage = 'Signup failed. Try again.';
          console.error('Signup failed:', error);
        },
      });
    });
  }
  
  
}
