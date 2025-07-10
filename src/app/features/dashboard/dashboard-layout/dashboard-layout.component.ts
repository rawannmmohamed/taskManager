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
  statuses: { label: string; value: string }[] | undefined;
  userId = '';

  constructor(private store: Store, private tasksService: TasksService) {}
  ngOnInit(): void {
    this.loadData();
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

  loadData() {
  this.store.select(selectUser).pipe().subscribe((user: User | null) => {
    if (user) {
      this.avatar = user.image;
      this.role = user.role;
      this.userId = user.id;

      const taskRequest = this.role === 'admin'
        ? this.tasksService.getallTasks()
        : this.tasksService.getTasksById(this.userId);

      taskRequest.subscribe((data: Task[]) => {
        this.tasks = data;
      });
    }
  });
}
  onRowEditSave(editedTask: Task) {
    this.tasksService
      .updateTask(editedTask.id, this.userId, editedTask)
      .subscribe({
        next: () => {
          console.log('Task updated');
        },
        error: (err) => {
          console.error('Error updating task:', err);
        },
      });
  }
  addNewTask() {
    const newTask: Task = {
      id: '',
      title: '',
      status: 'Pending',
      assignedTo: this.userId,
      description: '',
    };
    this.tasksService.addNewTask(newTask, this.userId).subscribe({
      next: () => {
        this.loadData();
        console.log('New Task added');
      },
      error: (err) => {
        console.error('Error adding new task:', err);
      },
    });
  }

  onRowdelete(removedTask: Task) {
    this.tasksService.deleteTask(removedTask.id, this.userId).subscribe({
      next: () => {
        this.loadData();
        console.log('Task deleted');
      },
      error: (err) => {
        console.error('Error deleting task:', err);
      },
    });
  }
}
