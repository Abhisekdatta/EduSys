import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityService } from './../../entity.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EntityModel } from './../entity.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
    selector:'entity-dailog',
    templateUrl:'./entitydailog.component.html',
    styleUrls:['./entitydailog.component.scss']
})
export class EntityDailog implements OnInit{
   

    entityModel:EntityModel;
    entityForm:FormGroup;
    redirect: string;
    //---------------
    color = 'accent';
    checked = false;
    disabled = false;
    labelPosition='after';
  
   
    filteredEntities: Observable<any[]>;
    entityTypeCtrl: FormControl;

    entities:any[]=[
      {
        entityType:'School',
        entityImg:'school',
        entityValue:'s'
      },
      {
        entityType:'Collage',
        entityImg:'location_city',
        entityValue:'c'
      }
    ]

    constructor(
        public dialogRef: MatDialogRef<EntityDailog>,
        @Inject(MAT_DIALOG_DATA) public entityIdObject: any,
        private formBuilder:FormBuilder,
        private _entityService:EntityService,
        private router:Router,
        public route: ActivatedRoute) { 
          this.entityTypeCtrl=new FormControl();
          this.filteredEntities = this.entityTypeCtrl.valueChanges
                                              .startWith(null)
                                              .map(entity => entity && typeof entity === 'object' ? entity.entityType : entity)
                                              .map(entityType => entityType ? this.filterEntities(entityType) : this.entities.slice());
         
        }

        filterEntities(entityType: string) {
          return this.entities.filter(entity =>
            entity.entityType.toLowerCase().indexOf(entityType.toLowerCase()) === 0);
        }

        optionSelected(event){
          this.entityForm.controls['entityType'].setValue(event.option.value.entityValue);
        }
         displayFn(entity): string {
           return entity ? entity.entityType : entity;
        }
        
    ngOnInit(){
        this.redirect = this.route.snapshot.queryParams['returnUrl'] || 'entityManagement/entity';
        this.buildForm();
        if(null!=this.entityIdObject){
          this._entityService.findOne(this.entityIdObject.entityId).subscribe(response=>{
            this.entityModel=response;
            this.entityModel.isActive=response.active;

           let ent1=this.entities.filter(entity=>{
                if(entity.entityValue===this.entityModel.entityType.toLowerCase()){
                  return entity;
                }
            })
            this.entityTypeCtrl.setValue(ent1[0]);

            this.entityForm.setValue({
              entityType:this.entityModel.entityType,
              name: this.entityModel.name, 
              code: this.entityModel.code,
              isActive:this.entityModel.isActive,
              email:this.entityModel.email,
              contactNo:this.entityModel.contactNo,
              faxNo:this.entityModel.faxNo,
              webSite:this.entityModel.webSite,
              addressLine1:this.entityModel.addressLine1,
              addressLine2:this.entityModel.addressLine2,
              numberOfUser:this.entityModel.numberOfUser,
              contractStartDate:this.entityModel.contractStartDate,
              contractEndDate:this.entityModel.contractEndDate
            });
          });
        }

        
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    formErrors = {
        'entityTypeCtrl':'',
        'name': '',
        'code': '',
        'email': '',
        'addressLine1': '',
        'contactNo': '',
        'faxNo': '',
        'numberOfUser': '',
        'contractStartDate': '',
        'contractEndDate': ''
      };
      validationMessages = {
        'entityTypeCtrl':{
          'required': 'Please select entity type',
        },
        'name': {
          'required': 'Please enter school name',
          'minlength':'Name should be at least 4 charecter'
        },
        'code': {
          'required': 'Please enter code'
        },
        'addressLine1': {
          'required': 'Please enter address'
        },
        'email': {
          'required': 'Please enter your email address',
          'email': 'please enter your vaild email'
        },
        'contactNo': {
            'required': 'Please enter contact details',
            'pattern':'Please enter valid contact no.',
            'minlength':'Contact number should be at 10 digit',
            'maxlength':'Contact number should be at 10 digit'
            
          },
          'faxNo': {
            'pattern':'Please enter valid contact no.',
            'minlength':'Contact number should be at 10 digit',
            'maxlength':'Contact number should be at 10 digit'
            
          },
        'numberOfUser': {
          'required': 'please enter number of user',
          'pattern':'Please enter valid number of user',
        },
        'contractStartDate': {
          'required': 'please enter contract start date',
        },
        'contractEndDate': {
          'required': 'please enter contract end date',
        }
      };

    buildForm() {
        this.entityForm = this.formBuilder.group({
          'isActive': ['',],
          'entityType':['',
            Validators.required
          ],
          'name': ['', [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(50)
          ]
          ],
          'code': ['', [
            Validators.required
          ]
          ],
          'email': ['', [
            Validators.required,
            Validators.email
          ]
          ],
          'contactNo': ['', [
            Validators.required,
            Validators.pattern('[0-9]*'),
            Validators.minLength(10),
            Validators.maxLength(10)
          ]
          ],
          'faxNo': ['',[
            Validators.pattern('[0-9]*'),
            Validators.minLength(10),
            Validators.maxLength(10)
          ]],
          'addressLine1': ['', [
            Validators.required
          ]
          ],
          'addressLine2': ['',],
          'webSite': ['',],
          'numberOfUser': ['', [
            Validators.required,
            Validators.pattern('[0-9]*'),
          ]
          ],
          'contractStartDate': ['', [
            Validators.required
          ]
          ],
          'contractEndDate': ['', [
            Validators.required
          ]
          ],
         
        });

        this.entityForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?:any) {
        if (!this.entityForm) {
          return;
        }
        const form = this.entityForm;
        for (const field in this.formErrors) {
          if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
              const messages = this.validationMessages[field];
              for (const key in control.errors) {
                if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                  this.formErrors[field] += messages[key] + ' ';
                }
              }
            }
          }
        }
      }

      createEntity(){
        this.entityModel=this.entityForm.value;
        console.log(this.entityModel);
        this._entityService.save(this.entityModel).subscribe(
          response=>{
            console.log("output="+response.json());
            this.onNoClick();
            this.router.navigate([this.redirect]);
            
          }
        );
      }
}