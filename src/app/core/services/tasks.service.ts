import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../models/task';

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
}
