import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UserProfile } from '../services/profile';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../services/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  usr: User = {
    id: 0,
    username: '',
    fname: '',
    lname: '',
    email: '',
    password: '',
    photoUrl: '',
    age: 0,
    role: 0,
  };
  userProfile: UserProfile = {
    line1: '',
    line2: '',
    city: '',
    state: '',
    street_name: '',
    country: '',
    phone: 0,
    pincode: 0,
    user_id: 0,
  };
  user = [
    {
      key: 'fullName',
      label: 'Full name',
      value: '',
      type: 'text',
    },
    {
      key: 'email',
      label: 'Email address',
      value: '',
      type: 'email',
    },
    {
      key: 'password',
      label: 'Password',
      value: '',
      type: 'password',
    },
    {
      key: 'confirmPassword',
      label: 'Confirm password',
      value: '',
      type: 'password',
    },
  ];
  userId = null;
  alertMessage = '';
  alertType = '';
  alertVisible = false;
  loading = false;

  constructor(
    private _api: ApiService,
    private _token: TokenStorageService,
    private _router: Router
  ) {}

  // Update user fields with current details
  ngOnInit(): void {
    // const { user_id, fname, email } = this._token.getUser();
    this.usr = JSON.parse(this._token.getLocalStorage());
    this.userId = this.usr.id;
    alert(this.userId);
    this.user[0].value = this.usr.username;
    this.user[1].value = this.usr.email;
    console.log(this.user);
  }

  canUpdate(): boolean {
    return this.user.filter((field) => field.value.length > 0).length !== 4
      ? true
      : false;
  }

  // Submit data to be updated
  onSubmit(): void {
    this.alertVisible = false;
    if (this.user[2].value !== this.user[3].value) {
      this.alertType = 'error';
      this.alertMessage = 'Passwords do not match';
      this.alertVisible = true;
    } else {
      this.loading = true;
      this._api
        .putTypeRequest(`users/${this.userId}`, {
          fullName: this.user[0].value,
          email: this.user[1].value,
          password: this.user[2].value,
        })
        .subscribe(
          (res: any) => {
            console.log(res);
            this.alertMessage = res.message;
            this.alertType = 'success';
            this.alertVisible = true;
            this.loading = false;
            const oldDetails = this._token.getUser();
            this._token.setUser({
              ...oldDetails,
              fname: this.user[0].value,
              email: this.user[1].value,
            });
            this.user[2].value = '';
            this.user[3].value = '';
            // window.location.reload();
          },
          (err: any) => {
            console.log(err);
            this.alertMessage = err.error.message;
            this.alertVisible = true;
            this.alertType = 'error';
            this.loading = false;
          }
        );
    }
  }
}
