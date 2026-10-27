export type TRegisterForm = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};
export type TLoginForm = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  accessToken: string | null;
  user: {
    email: string;
    firstname: string;
    lastname: string;
    confirmPassword: string;
    role: string;
    id: number;
  } | null;
};
