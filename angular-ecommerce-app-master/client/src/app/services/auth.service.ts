import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TokenStorageService } from './token-storage.service';
import { User } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  ////////////////////////
  usr: User = {
    id: 0,
    username: '',
    password: '',
    email: '',
    fname: '',
    lname: '',
    age: 0,
    role: 0,
    photoUrl: '',
  };

  //////////////////////////////
  constructor(
    private _api: ApiService,
    private _token: TokenStorageService,
    private _router: Router
  ) {
    this.userSubject = new BehaviorSubject<any>(this._token.getUser());
    this.user = this.userSubject.asObservable();
  }

  getUser() {
    console.log(this.userSubject);
    console.log(this.userSubject.value);
    return this.userSubject.value;
  }

  login(credentials: any) {
    return this._api.getTypeRequest('users').subscribe(
      (res: any) => {
        //////
        const loinUser = res.find((a: any) => {
          if (
            a.email === credentials.email &&
            a.password === credentials.password
          ) {
            this.usr = {
              id: a.id,
              username: a.username,
              password: a.password,
              email: a.email,
              // token: res.token,
              fname: a.fname,
              lname: a.lname,
              age: a.age,
              role: a.role,
              photoUrl: a.photoUrl,
            };
            this._token.setToken(a.username);
            this._token.setLocalStorage(this.usr);
          }
          return (
            a.email === credentials.email && a.password === credentials.password
          );
        });
        if (loinUser) {
          alert('login success');
          this._router.navigate(['/']);
        } else {
          alert('user not find');
        }
        /////
        const usera = {
          email: credentials.email,
          token: res.token,
          username: res.username,
        };

        // this._token.setToken(a.lname);
        this._token.setUser(this.usr);
        console.log(res);
        this.userSubject.next(usera);
        localStorage.setItem('try', JSON.stringify(usera));
        return usera;
      },
      (err) => {
        alert('Something is not write');
        console.log(err);
      }
    );
  }

  /////////////////////

  register(user: any): Observable<any> {
    return this._api.postTypeRequest('users', {
      username: user.fullName,
      email: user.email,
      password: user.password,
    });
  }

  logout() {
    this._token.clearStorage();
    this.userSubject.next(null);
  }
}
