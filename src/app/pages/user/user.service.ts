import { APP_CONFIG } from './../../app.config';
import { AuthHttp } from 'angular2-jwt';
import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions ,Headers} from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IAppConfig } from 'app/app.config';
import { Observable } from 'rxjs';
import { User } from '../../core/model/user/user.model';

@Injectable()
export class UserService {

  private apiUrl = '/assets/data/pages';
  private _userList$: BehaviorSubject<any>;

  get userList$() {
    return this._userList$.asObservable();
  }


  constructor(private _http: AuthHttp,@Inject(APP_CONFIG) private _config: IAppConfig) {
    this._userList$ = new BehaviorSubject<any>([]);
  }

  getUserList() {
    const url = `${this.apiUrl}/userList.json`;
    return this._http.get(url).map(res => res.json()).subscribe(res => {
      this._userList$.next(res);
    });
  }

  findUserByUserName(userName:string):Observable<User | null>{

    return this._http.get(this._config.apiEndpoint+'api/user/'+userName,this.options())
                     .map((response=>response.json()));
  }

  private options() {
    let headers = new Headers({ 'Authorization': '' + localStorage.getItem('token') });
    let options = new RequestOptions({ headers: headers });
    return options;
  }

}
