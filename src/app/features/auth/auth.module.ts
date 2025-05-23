import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
@NgModule({
  declarations: [SignInComponent, SignUpComponent, AuthComponent],
  imports: [CommonModule, AuthRoutingModule,InputTextModule,ButtonModule,FormsModule],
  
})
export class AuthModule {}
