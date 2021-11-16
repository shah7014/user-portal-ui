export class User {
  public id: number;
  public userId: string;
  public firstName: string;
  public lastName: string;
  public userName: string;
  public email: string;

  // password absent
  //public password: string;

  public profileImageUrl: string;

  //public lastLoginDate;
  // different from api name
  public lastLoginDateDisplay: Date;

  public joinDate: Date;
  public role: string;
  public authorities: string[];

  // different from api name
  public active: boolean;
  public notLocked: boolean;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.userName = '';
    this.email = '';
    this.active = false;
    this.notLocked = false;
    this.role = '';
    this.authorities = [];
  }
}
