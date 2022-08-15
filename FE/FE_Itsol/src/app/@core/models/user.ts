export class User {
  fullName: string;
  email: string;
  userName: string;
  phoneNumber: string;
  password: string;

  constructor(fullName: string,email: string,phoneNumber: string, userName: string,password: string) {
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.userName = userName;
    this.password = password;
  }
}
