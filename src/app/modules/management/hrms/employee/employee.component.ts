
import { Component, OnInit } from '@angular/core';
import { MatDialog ,MatDialogConfig} from '@angular/material';
import { EmployeeDialogComponent } from 'app/modules/management/hrms/employee/employeedialog/employeedialog.component';


@Component({
    selector:'mng-employee',
    templateUrl:'./employee.component.html',
    styleUrls:['./employee.component.scss']
})
export class EmployeeComponent implements OnInit{

    config:MatDialogConfig;
    ngOnInit(): void {
     this.config = new MatDialogConfig();
        //this.config.height='150';
        this.config.width='auto';
    }
    
    displayedColumns=['empName','userId','role','typeOfEmp','designation'];


    constructor(private matDialog:MatDialog){}

    openEmployeeDialog(){
        this.matDialog.open(EmployeeDialogComponent,this.config);
    }
}