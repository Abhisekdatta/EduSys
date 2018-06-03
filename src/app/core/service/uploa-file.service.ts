import {HttpClient, HttpEvent,  HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { APP_CONFIG, IAppConfig } from 'app/app.config';
import { RequestOptions, Headers, Response } from '@angular/http';


@Injectable()
export class UploadFileService{

    constructor(private _http: AuthHttp,private http: HttpClient,
                @Inject(APP_CONFIG) private _config: IAppConfig) {}
 
                // pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
                //   let formdata: FormData = new FormData();
               
                //   formdata.append('file', file);
               
                //   const req = new HttpRequest('POST', this._config.apiEndpoint+'post', formdata, {
                //     reportProgress: true,
                //     responseType: 'text'
                //   });
               
                //   return this.http.request(req);
                // }

                pushFileToStorage(file: File): Observable<any> {
                  let formdata: FormData = new FormData();
               
                  formdata.append('file', file);
                  return this._http.post(this._config.apiEndpoint+'post',formdata,this.options());
                 
                }
               
 
  getFiles(): Observable<any> {
    return this._http.get(this._config.apiEndpoint+'/getallfiles');
  }

  private options() {
    let headers = new Headers({ 'Authorization': '' + localStorage.getItem('token') });
    let reportProgress= true;
    let responseType='text';
    let options = new RequestOptions({ headers: headers});
    return options;
  }
}