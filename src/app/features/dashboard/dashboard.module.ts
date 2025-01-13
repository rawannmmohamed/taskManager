import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [UserComponent, AdminComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
