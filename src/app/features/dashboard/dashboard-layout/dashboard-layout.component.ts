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
  tasks: Task[] = [];
  statuses: any[] | undefined;
  userId = '';

  constructor(private store: Store, private tasksService: TasksService) {}
  ngOnInit(): void {
    this.store.select(selectUser).subscribe((user: User | null) => {
      if (user) {
        this.avatar = user.image;
        this.role = user.role;
        this.userId = user.id;
        if (this.role === 'admin') {
          this.tasksService.getallTasks().subscribe((data: Task[]) => {
            this.tasks = data;
            console.log(data);
            console.log(this.tasks);
          });
        } else {
          this.tasksService.getTasksById(user.id).subscribe((data: Task[]) => {
            this.tasks = data;
            console.log(this.tasks);
          });
        }
      }
    });
    this.statuses = [
      { label: 'Completed', value: 'Completed' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Ongoing', value: 'Ongoing' },
    ];
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

  onRowEditSave(editedTask: Task) {
    this.tasksService
      .updateTask(editedTask.id, this.userId, editedTask)
      .subscribe({
        next: () => {
          console.log('Task updated:', editedTask);
        },
        error: (err) => {
          console.error('Error updating task:', err);
        },
      });
  }
  addNewTask() {
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000000).toString(),
      title: '',
      status: 'Pending',
      assignedTo: this.userId,
      description: '',
    };
    this.tasksService.addNewTask(newTask, this.userId).subscribe({
      next: () => {
        console.log('New Task:', newTask);
      },
      error: (err) => {
        console.error('Error adding new task:', err);
      },
    });

    this.tasks = [newTask, ...this.tasks];
  }
}
