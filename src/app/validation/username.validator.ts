import { APP_CONFIG, IAppConfig } from './../app.config';
import { AuthHttp } from 'angular2-jwt';
import { Injectable, Inject } from '@angular/core';
import { EmployeeService } from './../modules/management/hrms/employee/employee.service';
import { UserService } from './../pages/user/user.service';
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { RequestOptions,Headers } from '@angular/http';

@Injectable()
export class UserNameValidators{

    constructor(private _employeeService:EmployeeService){}

     cannotContainSpace(control:AbstractControl):ValidationErrors | null{
        if((control.value as string).indexOf(" ") >=0){
            return {cannotContainSpace:true};
        }else{
            return null;
        }
    }

     shouldBeUnique(control:AbstractControl):Promise<ValidationErrors | null>{
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                this._employeeService.findUserByUserName(control.value as string)
                                  .subscribe(response=>{
                                      console.log(response);
                                      if(control.value===response.username){
                                        resolve({shouldBeUnique:true});
                                    }else{
                                        resolve(null);
                                    }
                                  });
            },2000);
        });
    }

    
    private options() {
        let headers = new Headers({ 'Authorization': '' + localStorage.getItem('token') });
        let options = new RequestOptions({ headers: headers });
        return options;
      }
    
}