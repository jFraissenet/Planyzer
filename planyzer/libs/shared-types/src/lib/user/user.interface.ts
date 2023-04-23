export interface User {
  id: number;

  username?: string;

  mail: string;

  psw: string;
}

export interface SignupRsp {
  readonly mail: string;
}
export interface LoginRsp {
  readonly token: string;
}

export interface LoginAnswer {
  mail: string;
  psw: string;
}
