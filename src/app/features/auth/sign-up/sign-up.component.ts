import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../../models/user';
import { signup } from '../../../ngrx/auth/auth.actions';
import { selectAuthError, selectUser } from '../../../ngrx/auth/auth.selectors';
import { Observable } from 'rxjs';
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
  error$: Observable<string | null>;
  errorMessage: string | null = '';

  constructor(private store: Store, private router: Router) {
    this.error$ = this.store.select(selectAuthError);

    this.store.select(selectUser).subscribe((user: User | null) => {
      if (user) {
        this.router.navigate(['/dashboard']); 
      }
    });
  }

  onSubmit(): void {
    if (this.email && this.password) {
      this.store.dispatch(
        signup({ email: this.email, password: this.password, role: this.role })
      );
    } else {
      this.errorMessage = 'Please enter email and password';
    }

    this.store.select(selectAuthError).subscribe((error) => {
      if (error) {
        this.errorMessage = error;
      }
    });
  }
}
