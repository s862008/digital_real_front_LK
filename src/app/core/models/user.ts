export interface ProfileForm {
  surname: string;
  username: string;
  name: string;
  patronymic: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
}

export interface RegistrationForm {
  username: string;
  phone: string;
  email: string;
  password: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface TokenRequest {
  access: string;
  refresh: string;
}

