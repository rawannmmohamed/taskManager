import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../models/task';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getallTasks() {
    return this.http.get<Task[]>(
      'https://67828a3fc51d092c3dcfe2da.mockapi.io/api/tasks'
    );
  }

  getTasksById(userId: string): Observable<Task[]> {
    return this.http
      .get<Task[]>('https://67828a3fc51d092c3dcfe2da.mockapi.io/api/tasks')
      .pipe(map((tasks) => tasks.filter((task) => task.assignedTo === userId)));
  }
  updateTask(taskId: string, userId: string, newTask: Task) {
    return this.http.put<Task>(
      `https://67828a3fc51d092c3dcfe2da.mockapi.io/api/users/${userId}/tasks/${taskId}`,
      newTask
    );
  }
  addNewTask(newTask: Task, userId: string) {
    return this.http.post<Task>(
      `https://67828a3fc51d092c3dcfe2da.mockapi.io/api/users/${userId}/tasks`,
      newTask
    );
  }
  deleteTask(taskId: string, userId: string) {
    return this.http.delete<Task>(
      `https://67828a3fc51d092c3dcfe2da.mockapi.io/api/users/${userId}/tasks/${taskId}`
    );
  }
}
