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
@NgModule({
  declarations: [UserComponent, AdminComponent, DashboardLayoutComponent],
  imports: [CommonModule, DashboardRoutingModule,AuthModule, MenubarModule,AvatarModule, InputTextModule],
  
})
export class DashboardModule {}
