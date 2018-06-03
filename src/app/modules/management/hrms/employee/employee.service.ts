import { CityModel } from 'app/core/model/address/city.model';
import { RequestOptions, Headers, Response } from '@angular/http';
import { User } from './../../../../core/model/user/user.model';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, IAppConfig } from './../../../../app.config';
import { AuthHttp } from 'angular2-jwt';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { CountryModel } from 'app/core/model/address/country.model';
import { StateModel } from '../../../../core/model/address/state.model';
@Injectable()
export class EmployeeService{
countryModel:CountryModel;
countryModelList:CountryModel[];
stateModelList:StateModel[];
cityModel:CityModel[];
    constructor(private _http: AuthHttp,@Inject(APP_CONFIG) private _config: IAppConfig) {}


  findUserByUserName(userName:string):Observable<any>{
    return this._http.get(this._config.apiEndpoint+'api/user/'+userName,this.options())
                     .map((response=>this.extractData(response)));
  }

findCountry():CountryModel[]{
  this.countryModelList=new Array<CountryModel>()
this.countryModel=new CountryModel(1,'India');
   this.countryModelList.push(this.countryModel);
   return this.countryModelList;
}

findState(countryId:number):StateModel[]{
  return;
}
findCity(stateId:number):CityModel[]{
  return;
}

  private extractData(res:Response){
    if(res.status!=204){
      return res.json();
    }else{
      return {};
    }
}

  private options() {
    let headers = new Headers({ 'Authorization': '' + localStorage.getItem('token') });
    let options = new RequestOptions({ headers: headers });
    return options;
  }
}