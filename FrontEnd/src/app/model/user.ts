export class User {
  public userId: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public role: string;
  public password: string;
  public authorities: [];

  constructor() {
    this.userId = '';
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';
    this.role = '';
    this.authorities = [];
    this.password = '';
  }

}
