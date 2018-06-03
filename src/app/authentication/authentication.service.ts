import { Injectable, Inject } from '@angular/core';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

import { User } from '../core/model/user/user.model';
import { APP_CONFIG, IAppConfig } from "app/app.config";

@Injectable()
export class AuthenticationService {

  constructor(private http: AuthHttp,@Inject(APP_CONFIG) private _config: IAppConfig) { }

  doLogin(credentials) {
    return this.http.post(this._config.apiEndpoint+"auth", credentials)
      .map(res => {
        const data = res.json();
        if (data) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
      });
  }

  doLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn() {
    return tokenNotExpired('token');
  }

  getRoles() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    return user.authorities;
  }

}
