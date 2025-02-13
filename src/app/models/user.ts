export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}
export interface AuthState {
  user: User | null;
  error: string | null;
}