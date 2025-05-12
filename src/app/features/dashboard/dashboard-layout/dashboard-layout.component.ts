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
              status: 'Completed',
            },
            {
              code: 'A-002',
              user: 'example@gmail.com',
              title: 'Admin Task 2',
              status: 'Ongoing',
            },
             {
              code: 'A-003',
              user: 'example@gmail.com',
              title: 'Admin Task 3',
              status: 'Pending',
            },
          ];
        } else  {
          this.tasks = [
            { code: 'U-001', title: 'User Task 1', date:'03 oct, 2023' ,status: 'Completed' },
            { code: 'U-002', title: 'User Task 2', date:'03 oct, 2023' ,status: 'Ongoing' },
            { code: 'U-003', title: 'User Task 3', date:'03 oct, 2023' ,status: 'Pending' },
          ];
        }
      }
    });
  }

 getSeverity(
  status: string
): 'success' | 'secondary' | 'info' | 'warn' {
  switch (status) {
    case 'Completed':
      return 'success';
    case 'Pending':
      return 'warn';
    case 'Ongoing':
      return 'info';
    default:
      return 'secondary';
  }
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
