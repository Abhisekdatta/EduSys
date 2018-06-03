import { APP_CONFIG, IAppConfig } from './../../app.config';
import { AuthHttp } from 'angular2-jwt';
import { Injectable, Inject } from '@angular/core';
import { User } from '../../core/model/user/user.model';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { RequestOptions, Http , Headers} from '@angular/http';

@Injectable()
export class SignUpService{

    constructor(private _http: AuthHttp,
                @Inject(APP_CONFIG) private _config: IAppConfig){}

    doRegistration(user:User){
        return this._http.post(this._config.apiEndpoint+"users",JSON.stringify(user));
    }

    findAllUsers(){
        return this._http.get(this._config.apiEndpoint+"users");
                        
    }

    findAllUsers2(){
        return this._http.get(this._config.apiEndpoint+"api/users", this.options())
        .catch(this.handleError);
    }

    private optionstemp() {
        console.log(localStorage.getItem('token'));
        let headers = new Headers({ 'Authorization': '' + localStorage.getItem('token') });
        let options = new RequestOptions({ headers: headers });
        return options;
      }
      private options() {
        let headers = new Headers({ 'Authorization':localStorage.getItem('token') });
        let options = new RequestOptions({ headers: headers });
        return options;
      }

      protected extractData(res: Response) {
        let body = res.json() || '';
        return body;
      }
    
      protected handleError(error: Response | any) {
        let msg: string;
        if(error instanceof Response) {
         // msg = error.json() || '';
        } else {
          msg = error.message ? error.message : error.toString();
        }
        
        return Observable.throw(msg);
      }
    
}