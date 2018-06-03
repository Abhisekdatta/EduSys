import { AuthenticationService } from './../../authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { AuthService } from '../../core/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

 
  /*----------------------------------*/
    userForm:FormGroup;
    public submitted:boolean = false;
    errorShown: boolean;
    errorMessage: string;
    redirect: string;
  /*----------------------------------*/
  formErrors = {
    'email': '',
    'password': '',
    'username':''
  };
  validationMessages = {
    'username':{
      'required': 'Please enter your username',
    },
    'email': {
      'required': 'Please enter your email address',
      'email': 'please enter your vaild email',
      'username':'please enter your user name'
    },
    'password': {
      'required': 'please enter your password',
      'pattern': 'The password must contain numbers and letters',
      'minlength': 'Please enter more than 4 characters',
      'maxlength': 'Please enter less than 25 characters',
    }
  };

  /*constructor(private router:Router,
              private fb:FormBuilder,
              private auth:AuthService) {
  }*/

  constructor(private router:Router,
    private fb:FormBuilder,
    public auth: AuthenticationService,
    public route: ActivatedRoute) {
}

  ngOnInit() {
    this.buildForm();
    this.auth.doLogout();
    this.redirect = this.route.snapshot.queryParams['returnUrl'] || 'apps/navigation';
  }

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        //Validators.required,
        //Validators.email
      ]
      ],
      'username': ['', [
        Validators.required
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?:any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
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

  signInWithGoogle() {
  //  this.auth.googleLogin().then(() => this.afterSignIn());
  }

  signInWithGithub() {
   // this.auth.githubLogin().then(() => this.afterSignIn());
  }

  signInWithEmail() {
    /*this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password'])
      .catch(error => {
        console.log(error);
      });*/
  }

  signInAnonymously() {
    this.router.navigate(['/']);
  }

  login() {
    this.signInWithEmail();
  }

  private afterSignIn() {
    this.router.navigate(['/']);
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.userForm.valid) {
      // your code goes here
       this.auth.doLogin(values)
       .subscribe(
         data => this.router.navigate([this.redirect]),
         error => {
           this.errorMessage = error.json().message;
           console.log("error msg="+this.errorMessage);
           this.errorShown = true;
         }
       );
    }
  }
}
