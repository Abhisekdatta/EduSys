import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

export class Class{
  constructor(public className?:string,public noOfStudent?:number,public noOfSection?:number){}
}

@Component({
    selector: 'com-entity',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
  })
export class CourseComponent implements OnInit{

  designCourseForm:FormGroup;
  color = 'accent';
  checked = false;
  disabled = false;
  labelPosition='before';


  formErrors={
    'noOfStudent':''
  }
  validationMessages={
    'noOfStudent':{
      'required': 'Please enter number of student !',
      'pattern':'Please enter valid student no.',
    }
  }

  constructor(
    private formBuilder:FormBuilder
  ){}

  ngOnInit(){
    this.buildForm();
  }

 

  createDesignCourse(){
    console.log(this.designCourseForm.value);
  }
  buildForm() {
    this.designCourseForm = this.formBuilder.group({
    'isActive': ['',],
    'courseCode':['',
      Validators.required
    ],
    'courseName':['',
      Validators.required
    ],
    'noOfClass':['',
      Validators.required
    ],
    'classes':this.formBuilder.array([]),
   
    })
  }
  
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  addClass():void{
   const control = <FormArray>this.designCourseForm.controls['classes'];
   if(control.controls.length>0){
      this.clearFormArray(control);
   }
  
    for(let i=1;i<=this.designCourseForm.get('noOfClass').value;i++){
      control.push(this.createClass(new Class('Class '+i)));
    }
  }
  createClass(classObj?:Class):FormGroup{
    if (!this.designCourseForm) {
      return;
    }
    return this.formBuilder.group({
      className:[classObj.className,Validators.required],
      noOfStudent:[classObj.noOfStudent,Validators.required],
      noOfSection:[classObj.noOfSection,Validators.required],
      sections:this.formBuilder.array([]),
    });
  }

  addSection(noOfSection:number,classes:FormGroup){
    const sections = <FormArray>classes.controls['sections'];
    if(sections.controls.length>0){
      this.clearFormArray(sections);
   }
    for(let i=1;i<=noOfSection;i++){
      sections.push(this.createSection());
    }
  }

  createSection():FormGroup{
    if (!this.designCourseForm) {
      return;
    }
    return this.formBuilder.group({
      sectionName:'',
      roomNo:'',
      noOfStudent:['',[
        Validators.required,
        Validators.pattern('[0-9]*')]
      ],
      sectionOwner:''
    });
  }

  deleteSection(position:number,classes:FormGroup){
    const sections = <FormArray>classes.controls['sections'];
    sections.removeAt(position);
    classes.controls.noOfSection.setValue(sections.length);
  }


  onValueChanged(data?:any) {
    if (!this.designCourseForm) {
      return;
    }
    const form = this.designCourseForm;
    for (const field in this.designCourseForm) {
      if (Object.prototype.hasOwnProperty.call(this.designCourseForm, field)) {
        this.designCourseForm[field] = '';
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
}