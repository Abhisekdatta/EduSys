import { CountryModel } from 'app/core/model/address/country.model';
import { EmployeeService } from './../employee.service';
import { UploadFileService } from './../../../../../core/service/uploa-file.service';
import { UserService } from 'app/pages/user/user.service';
import { UserNameValidators } from './../../../../../validation/username.validator';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StateModel } from '../../../../../core/model/address/state.model';
import { CityModel } from 'app/core/model/address/city.model';


@Component({
    selector:'emp-dialog',
    templateUrl:'./employeedialog.component.html',
    styleUrls:['./employeedialog.component.scss']
})
export class EmployeeDialogComponent implements OnInit{

    employeeForm:FormGroup;
    salutations:string[]=['Mr.','Mis.','Dr.'];
    uploadPortionColor='#DDBDF1';

    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    bufferValue = 75;


    //countryModelList:CountryModel[]=new Array();
    countryModelList:CountryModel[];
    stateModelList:StateModel[];
    cityModelList:CityModel[]

    
    
    /*
     Variables for image upload
    */

   selectedFiles: FileList
   currentFileUpload: File
   progress: { percentage: number } = { percentage: 0 }


    constructor(private fb:FormBuilder,
                private userNameValidator:UserNameValidators,
                private uploadService:UploadFileService,
                private employeeService:EmployeeService){}

    ngOnInit(){
       this.countryModelList=this.employeeService.findCountry();
       console.log(this.countryModelList);
       this.buildForm();
       //this.findCountry();
    }

    buildForm(){
        this.employeeForm=this.fb.group({
            _basic:new FormGroup({
                _salutation:new FormControl('',Validators.required), 
                _firstName:new FormControl('',[
                    Validators.required,
                    Validators.minLength(5),
                ]),
                _lastName:new FormControl('',[
                                Validators.required,
                                Validators.minLength(5),
                                ]),    
            }),
            
            _image:new FormControl(''),
            _account:new FormGroup({
                _userName:new FormControl('',[Validators.required,
                    this.userNameValidator.cannotContainSpace],
                                              this.userNameValidator.shouldBeUnique.bind(this.userNameValidator)),
                _password:new FormControl('',Validators.required)
            }),
            _address:new FormGroup({
                _country:new FormControl('',Validators.required),
                _state:new FormControl('',Validators.required),
                _city:new FormControl(''),
                _village:new FormControl(''),
                _pin:new FormControl('',Validators.required),
                _addressLine1:new FormControl(''),
                _addressLine2:new FormControl('')
            })
            

        });
    }

    findCountry(){
        this.countryModelList=this.employeeService.findCountry();
        console.log(this.countryModelList);
    }

    findState(countryId:number){
        this.stateModelList=this.employeeService.findState(countryId);
    }

    findCity(stateId:number){
        this.cityModelList=this.employeeService.findCity(stateId);
    }


    get salutation(){
        return this.employeeForm.get('_basic._salutation');
    }
    get firstName(){
        return this.employeeForm.get('_basic._firstName');
    }
    get lastName(){
        return this.employeeForm.get('_basic._lastName');
    }

    get userName(){
        return this.employeeForm.get('_account._userName');
    }

    get image(){
        return this.employeeForm.get('_image');
    }

    get country(){
        return this.employeeForm.get('_address._country');
    }
    get state(){
        return this.employeeForm.get('_address._state');
    }


    createEmployee(){
        console.log(this.employeeForm);
    }

    selectFile(event) {
        const file = event.target.files.item(0)
     
        if (file.type.match('image.*')) {
          this.selectedFiles = event.target.files;
          console.log(this.selectedFiles);
        } else {
          alert('invalid format!');
        }
      }

      upload() {
        this.progress.percentage = 0;
     
        this.currentFileUpload = this.selectedFiles.item(0)

        console.log(this.currentFileUpload);
         this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
             console.log(event);
        //    if (event.type === HttpEventType.UploadProgress) {
        //      this.progress.percentage = Math.round(100 * event.loaded / event.total);
        //    } else if (event instanceof HttpResponse) {
        //      console.log('File is completely uploaded!');
        //    }
         })
     
        this.selectedFiles = undefined
      }
     
      click(){

        alert("hi");
        this.currentFileUpload = this.selectedFiles.item(0);
          console.log('hi='+this.currentFileUpload);
      }
}