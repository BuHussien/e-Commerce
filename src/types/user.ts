export interface TUser {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  confirmPassword: string;
  role: "admin" | "user" | "greatAdmin";
}