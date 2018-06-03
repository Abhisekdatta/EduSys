import { CourseComponent } from './course/course.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';

const routes: Routes = [
    {
        path:'',
        component:CourseComponent
    },
    {
        path:'designCourse',
        component:CourseComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CourseRoutingModule{

}