export class User {
    _id?: string;
    email: string;
    lastname?: string;
    firstname?: string;
    token: string;
}

export class Guest {
  email: string;
  password: string;
}

export class RegisterUser {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  confirm_pwd?: string;
  club_id?: string;
}
