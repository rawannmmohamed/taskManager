import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { authGuard } from '../../guards/auth.guard';
import { AuthService } from '../../core/services/auth.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => {
      const authService = inject(AuthService);
      const user = authService.getCurrentUser();
      if (user?.role === 'admin') {
        return 'admin';
      } else {
        return 'user';
      }
    },
  },
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
