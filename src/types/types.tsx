export interface UserData {
  username: string;
  role: string;
}

export interface MessageResponse {
  message: string;
  ok: boolean;
}

export interface LoginResponse {
  message: string;
  ok: boolean;
  role: string;
}
