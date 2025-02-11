import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
 

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User | null> {
    return this.http
      .get<User[]>('https://67828a3fc51d092c3dcfe2da.mockapi.io/api/users')
      .pipe(
        map((users) => {
          const user = users.find(
            (u) => u.email === email && u.password === password
          );
          if (user) {
            this.userSubject.next(user);
          }
          return user || null;
        })
      );
  }

  logout(): void {
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  isAdmin(): boolean {
    const user = this.userSubject.value;
    return user?.role === 'admin';
  }

  signup(email: string, password: string, role: 'user'): Observable<User> {
    return this.checkEmailExists(email).pipe(
      switchMap((exists) => {
        if (exists) {
          throw new Error('Email already exists');
        }
        const newUser: User = { id: this.generateId(), email, password, role };
        return this.http.post<User>(
          'https://67828a3fc51d092c3dcfe2da.mockapi.io/api/users',
          newUser
        );
      }),
      map((user) => {
        this.userSubject.next(user);
        return user;
      })
    );
  }

  checkEmailExists(email: string): Observable<boolean> {
    const users = this.userSubject.value ? [this.userSubject.value] : [];
    return users.length > 0
      ? of(users.some((user) => user.email === email))
      : this.http
          .get<User[]>('https://67828a3fc51d092c3dcfe2da.mockapi.io/api/users')
          .pipe(map((users) => users.some((user) => user.email === email)));
  }

  private generateId(): string {
    return Math.floor(Math.random() * 10000).toString();
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }
}
