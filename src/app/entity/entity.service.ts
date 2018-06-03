import { IAppConfig , APP_CONFIG} from 'app/app.config';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Page } from './../core/model/paging/pageable.model';
import { EntityModel } from './entity/entity.model';
import { Injectable, Inject } from '@angular/core';
import { RequestOptions, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { PageEvent, Sort } from '@angular/material';

@Injectable()
export class EntityService {

    constructor(private _http: AuthHttp,
        @Inject(APP_CONFIG) private _config: IAppConfig){}

    findAllEntity(page: PageEvent,sort:Sort,filterString:string): Observable<Page<EntityModel>> {
      if(null!=sort){
        return this._http.get(this._config.apiEndpoint+"api/pageableEntities?page="+page.pageIndex+"&size="+page.pageSize+"&sort="+sort.active+"&direction="+sort.direction,this.options())
                        .map(this.extractData)
                        .catch(this.handleError);
      }else{
        return this._http.get(this._config.apiEndpoint+"api/pageableEntities?page="+page.pageIndex+"&size="+page.pageSize,this.options())
                                          .map(this.extractData)
                                          .catch(this.handleError);
      }
       
    }


    findAll():Observable<EntityModel[]>{
      return this._http.get(this._config.apiEndpoint+"api/entities",this.options())
                                .map(this.extractData)
                                .catch(this.handleError);
    }

    save(entityModel:EntityModel){
      return this._http.post(this._config.apiEndpoint+"api/entity",JSON.stringify(entityModel),this.options());
    }
    delete(entityId:number){
      console.log("entityid="+entityId);
      return this._http.delete(this._config.apiEndpoint+"api/entity/"+entityId,this.options());
    }

    updateEntityStatus(status:boolean,entityId:number){
      return this._http.put(this._config.apiEndpoint+"api/entity/"+entityId+"/"+status,this.options());
    }

    findOne(entityId:number){
        return this._http.get(this._config.apiEndpoint+"api/entity/"+entityId,this.options())
                         .map(this.extractData)
                         .catch(this.handleError);
    }

    protected extractData(res: Response) {
      let body = res.json();
      return body;
    }
    
      protected handleError(error: Response | any) {
        let msg: string;
        if(error instanceof Response) {
          msg = error.json() || '';
        } else {
          msg = error.message ? error.message : error.toString();
        }
    
        return Observable.throw(msg);
      }
    
      // need to decouple this.
      private options() {
        let headers = new Headers({ 'Authorization': '' + localStorage.getItem('token') });
        let options = new RequestOptions({ headers: headers });
        return options;
      }
}