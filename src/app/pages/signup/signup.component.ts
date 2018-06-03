import { User } from './../../core/model/user/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { SignUpService } from 'app/pages/signup/signup.service';
//import { AuthService } from '../../core/auth.service';
import { Authority } from '../../core/model/user/authority.enum';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm:FormGroup;
  color = 'accent';
  checked = false;
  disabled = false;
  labelPosition='after';
  errorMessage:string;
  errorShown:boolean;
  private users:User[];

  userModel:User;
  authorities:Array<Authority>;
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  passwordConfirm:string;

  message:string;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'username': '',
    'email': '',
    'password': ''
  };
  validationMessages = {
    'firstname': {
      'required': 'Please enter your first name'
    },
    'lastname': {
      'required': 'Please enter your last name'
    },
    'username': {
      'required': 'Please enter your user name'
    },
    'email': {
      'required': 'Please enter your email address',
      'email': 'please enter your vaild email'
    },
    'password': {
      'required': 'please enter your password',
      'pattern': 'The password must contain numbers and letters',
      'minlength': 'Please enter more than 6 characters',
      'maxlength': 'Please enter less than 25 characters',
    }
  };


  constructor(private router:Router,
              private fb:FormBuilder,
              private _signUpService:SignUpService) {
  }
  
  ngOnInit() {

    this._signUpService.findAllUsers()
                       .subscribe(response=>{
                         this.users=response.json();
                         console.log("response="+this.users[0].email);
                         console.log(response.json().id);
                       }
                       );

    this.buildForm();
  }

  buildForm() {
    this.signUpForm = this.fb.group({

      'firstname': ['', [
        Validators.required
      ]
      ],
      'lastname': ['', [
        Validators.required
      ]
      ],
      'username': ['', [
        Validators.required
      ]
      ],
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
    });

    this.signUpForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?:any) {
    if (!this.signUpForm) {
      return;
    }
    const form = this.signUpForm;
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

  /*constructor(private router:Router,
              private auth:AuthService) {
  }*/



  signUpWithEmail() {
    console.log(this.email,this.password);
    //this.auth.emailSignUp(this.email, this.password).then(() => this.afterSignIn());
  }

  register() {
    this.userModel=this.signUpForm.value;
    this.userModel.authorities=this.authorities;
    console.log(this.userModel);

    this._signUpService.doRegistration(this.userModel)
    .subscribe(
      response=>{
        console.log('data='+response.json());
      },
      error => {
        this.errorMessage = error.json().message;
        this.errorShown = true;
      }
    );
    //this.signUpWithEmail();
    console.log(this.errorMessage);
  }

  private afterSignIn() {
    this.router.navigate(['/']);
  }
}
