import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from '../../../ngrx/auth/auth.actions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectAuthError, selectUser } from '../../../ngrx/auth/auth.selectors';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  email = '';
  password = '';
  errorMessage: string | null = null;
  error$: Observable<string | null>;

  constructor(private store: Store, private router: Router) {
    this.error$ = this.store.select(selectAuthError);
  }

  onSubmit(): void {
    if (this.email && this.password) {
      this.store.dispatch(login({ email: this.email, password: this.password }));
    } else {
      this.errorMessage = 'Please enter email and password';
    }

    
    this.store.select(selectUser).subscribe(user => {
      if (user) {
        this.router.navigate(['/dashboard']); 
      }
    });

    this.store.select(selectAuthError).subscribe(error => {
      if (error) {
        this.errorMessage = error; 
      }
    });
  }
}
