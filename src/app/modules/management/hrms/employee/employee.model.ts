import { ContactModel } from './../../../../core/model/contact/contact.model';
import { AddressModel } from './../../../../core/model/address/address.model';
import { DesignationModel } from './designation.model';
import { User } from "app/core/model/user/user.model";
import { RoleModel } from 'app/core/model/role/role.model';



export class EmployeeModel{

     constructor(private _id:number,
                private _firstName:string,
                private _lastName:string,
                private _age:number,
                private _dob:Date,
                private _middelName?:string,
                private _contact?:ContactModel,
                private _user?:User,
                private _address?:AddressModel,
                private _designation?:DesignationModel,
                private _role?:RoleModel){
    }

    get firstName():string{
        return this._firstName;
    }
    get lastName():string{
        return this.lastName;
    }
    get age():number{
        return this._age;
    }
    

}