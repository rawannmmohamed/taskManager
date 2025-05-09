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
  constructor(private store: Store) {
    this.store.select(selectUser).subscribe((user: User | null) => {
      if (user) {
        this.avatar = user.image;
      }
    });
  }

  avatar = '';
  tasks = [{ code: '22222', name: 'task1', status: 'done' }];
  statuses: any[] | undefined;
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
