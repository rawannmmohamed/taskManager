import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../../models/user';
import { selectUser } from '../../../ngrx/auth/auth.selectors';
import { TasksService } from '../../../core/services/tasks.service';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-dashboard-layout',
  standalone: false,
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {
  avatar = '';
  role = '';
  tasks: any[] = [];
  statuses: any[] | undefined;

  constructor(private store: Store, private tasksService: TasksService) {}
  ngOnInit(): void {
    this.store.select(selectUser).subscribe((user: User | null) => {
      if (user) {
        this.avatar = user.image;
        this.role = user.role;
        if (this.role === 'admin') {
          this.tasksService.getallTasks().subscribe((data:Task[]) => {
            this.tasks = data;
            console.log(data)
            console.log(this.tasks)
          });
        } else {
          return
        }
      }
    });
  }

  getSeverity(status: string): 'success' | 'secondary' | 'info' | 'warn' {
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
