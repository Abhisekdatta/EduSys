import { EmployeeComponent } from './hrms/employee/employee.component';
import { ManagementComponent } from './management.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path:'',
        component:ManagementComponent
    },
    {
        path:'createEmployee',
        component:EmployeeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagementRoutingModule{

}