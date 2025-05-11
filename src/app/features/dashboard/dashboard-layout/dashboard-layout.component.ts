import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../../models/user';
import { selectUser } from '../../../ngrx/auth/auth.selectors';

@Component({
  selector: 'app-dashboard-layout',
  standalone: false,
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {
  avatar = '';
  role = '';
  tasks:any[] = [];
  statuses: any[] | undefined;

  constructor(private store: Store) {
    this.store.select(selectUser).subscribe((user: User | null) => {
      if (user) {
        this.avatar = user.image;
        this.role = user.role;
        if (this.role === 'admin') {
          this.tasks = [
            {
              code: 'A-001',
              user: 'example@gmail.com',
              title: 'Admin Task 1',
              progress: 'completed',
            },
            {
              code: 'A-002',
              user: 'example@gmail.com',
              title: 'Admin Task 2',
              progress: 'pending',
            },
          ];
        } else  {
          this.tasks = [
            { code: 'U-001', name: 'User Task 1', status: 'done' },
            { code: 'U-002', name: 'User Task 2', status: 'in-progress' },
          ];
        }
      }
    });
  }

  getSeverity(
    arg0: any
  ):
    | 'success'
    | 'secondary'
    | 'info'
    | 'warn'
    | 'danger'
    | 'contrast'
    | undefined {
    throw new Error('Method not implemented.');
  }

  onRowEditInit(_t22: any) {
    throw new Error('Method not implemented.');
  }

  onRowEditSave(_t22: any) {
    throw new Error('Method not implemented.');
  }

  onRowEditCancel(_t22: any, _t24: any) {
    throw new Error('Method not implemented.');
  }
}
