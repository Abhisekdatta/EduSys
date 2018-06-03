import {HttpClientModule} from '@angular/common/http';
import { UserNameValidators } from './../../validation/username.validator';
import { EmployeeService } from './hrms/employee/employee.service';
import { ManagementComponent } from './management.component';
import { EmployeeComponent } from './hrms/employee/employee.component';
import { SharedModule } from './../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ManagementRoutingModule } from 'app/modules/management/management.routing';
import { EmployeeDialogComponent } from 'app/modules/management/hrms/employee/employeedialog/employeedialog.component';
import { UploadFileService } from 'app/core/service/uploa-file.service';




@NgModule({
    imports:[
        SharedModule,
        ReactiveFormsModule,
        ManagementRoutingModule,
        HttpClientModule
    ],
    declarations: [
        EmployeeComponent,
        ManagementComponent,
        EmployeeDialogComponent
    ],
    providers:[UserNameValidators,EmployeeService,UploadFileService],
    entryComponents:[EmployeeDialogComponent]     
})
export class ManagementModule{

}