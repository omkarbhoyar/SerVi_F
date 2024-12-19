import { Injectable } from '@angular/core';

const TOKEN = 's_token';
const USER = 's_user';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  static saveToken(token: any) {
    throw new Error('Method not implemented.');
  }
  static saveUser(user: any) {
    throw new Error('Method not implemented.');
  }
  constructor() {}

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static getToken(): string {
    const token = localStorage.getItem(TOKEN);
    console.log(token+"token print jahala re")
    return token;
  }

  public saveUser(user): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId(): string {
    const user = this.getUser();
    if (user === null) {
      return '';
    }
    return user.userID;
  }

  static getUserRole(): string {
    const user = this.getUser();

    console.log('User Object in getUserRole:', user);
    if (user === null) {
      console.warn('Role not found in user object');
      return '';
    }
    return user.role;
  }

  static isClintLoggedIn(): boolean {
    if (this.getToken() === null) {
    return false;
    }
    const role: string = this.getUserRole();
    return role == 'CLIENT';
  }

  static isCompanyLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'COMPANY';
  }

  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
