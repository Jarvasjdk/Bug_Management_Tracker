export class Admin{
    public adminId: string;
    public firstName: string;
    public lastName: string;
    public username: string;
    public email: string;
    public role: string;
    public authorities: [];
  
    constructor() {
      this.adminId = '';
      this.firstName = '';
      this.lastName = '';
      this.username = '';
      this.email = '';
      this.role = '';
      this.authorities = [];
    }
}