import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../models/user';
import { signup } from '../../../ngrx/auth/auth.actions';

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

  constructor(private store: Store<{ auth: AuthState }>) {}

  onSubmit() {
    if (this.email && this.password) {
      this.store.dispatch(signup({ email: this.email, password: this.password, role: 'user' }));
    }
  }
}
