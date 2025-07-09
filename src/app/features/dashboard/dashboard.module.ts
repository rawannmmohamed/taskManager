import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { AuthModule } from '../auth/auth.module';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@NgModule({
  declarations: [UserComponent, AdminComponent, DashboardLayoutComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AuthModule,
    MenubarModule,
    AvatarModule,
    InputTextModule,
    TableModule,
    ToastModule,
    TagModule,
    SelectModule,
    FormsModule,
    ButtonModule,
    ProgressSpinnerModule 
  ],
})
export class DashboardModule {}
