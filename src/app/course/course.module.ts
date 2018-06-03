import { ReactiveFormsModule } from '@angular/forms';
import { CourseRoutingModule } from './course.routing';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CourseComponent } from './course/course.component';


@NgModule({
    imports: [
        SharedModule,
        CourseRoutingModule,
        ReactiveFormsModule

    ],
    declarations: [
        CourseComponent
    ],
    providers:[
    ]
    
})
export class CourseModule{

}