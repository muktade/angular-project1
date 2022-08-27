import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  TOKEN_KEY = 'auth-token';
  USER_KEY = 'auth-user';
  // USER_KEY = 'user';

  constructor() {}
  ////////////////
  public setLocalStorage(userDetails: User) {
    return localStorage.setItem(this.TOKEN_KEY, JSON.stringify(userDetails));
  }

  public getLocalStorage(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): any {
    return JSON.parse(sessionStorage.getItem(this.USER_KEY));
  }

  ///////////////////////
  public getToken(): string {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  // getUser(): any {
  //   return JSON.parse(sessionStorage.getItem(this.USER_KEY));
  // }

  setUser(user): void {
    sessionStorage.removeItem(this.USER_KEY);
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  clearStorage(): void {
    sessionStorage.clear();
    localStorage.clear();
  }
}
