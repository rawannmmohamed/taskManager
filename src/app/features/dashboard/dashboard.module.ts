import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [UserComponent, AdminComponent, DashboardLayoutComponent],
  imports: [CommonModule, DashboardRoutingModule,AuthModule],
  
})
export class DashboardModule {}
