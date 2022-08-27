import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ///update//
  email = '';
  password = '';
  error = '';
  loading = false;
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _token: TokenStorageService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  // onSubmit(): void {
  //   this.loading = true;
  //   this.error = '';
  //   if (!this.email || !this.password) {
  //     this.error = 'Make sure to fill everything ;)';
  //   } else {
  //     this._auth
  //       .login({ email: this.email, password: this.password })
  //       .subscribe(
  //         (res) => {
  //           this.loading = false;
  //           this._router.navigate(['/']);
  //         },
  //         (err) => {
  //           console.log(err);
  //           this.error = err.error.message;
  //           this.loading = false;
  //         }
  //       );
  //   }
  // }

  ////////////////////////////////

  // onSubmit(): void {
  //   this.loading = true;
  //   this.error = '';
  //   if (!this.email || !this.password) {
  //     this.error = 'Make sure to fill everything ;)';
  //   } else {
  //     this.http.get<any>('http://localhost:3000/users').subscribe(
  //       (res) => {
  //         const userl = res.find((a: any) => {
  //           return a.email === this.email && a.password === this.password;
  //         });
  //         if (userl) {
  //           alert('login success');
  //           let user = {
  //             email: this.email,
  //             token: res.token,
  //           };
  //           this._token.setToken(res.token);
  //           this._token.setUser(res.data);
  //           console.log(res);
  //           this.userSubject.next(user);
  //           this.router.navigate(['/']);
  //           return user;
  //         } else {
  //           alert('user not find');
  //         }
  //       },
  //       (err) => {
  //         alert('Something is not write');
  //       }
  //     );
  //   }
  // }
  ///////////////////////////////

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Make sure to fill everything ;)';
    } else {
      this._auth.login({ email: this.email, password: this.password });
      //     .subscribe(
      //       (res) => {
      //         const userl = res.find((a: any) => {
      //           return a.email === this.email && a.password === this.password;
      //         });
      //         if (userl) {
      //           alert('login success');
      //           // let user = {
      //           //   email: this.email,
      //           //   token: res.token,
      //           // };
      //           // this._token.setToken(res.token);
      //           // this._token.setUser(res.data);
      //           // console.log(res);
      //           // this.userSubject.next(user);
      //           // return user;
      //         }
      //       },
      //       (err) => {
      //         alert('Something is not write');
      //         console.log(err);
      //       }
      //     );
    }
  }

  /////////////////////
  canSubmit(): boolean {
    return this.email.length > 0 && this.password.length > 0;
  }
}
