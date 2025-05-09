export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  image: string;
}
export interface AuthState {
  user: User | null;
  error: string | null;
}
