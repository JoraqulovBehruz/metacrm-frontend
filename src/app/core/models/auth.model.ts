export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserInfo {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  organizationId: number | null;
  organizationName: string | null;
}

export interface LoginResponse {
  token: string;
  user: UserInfo;
}