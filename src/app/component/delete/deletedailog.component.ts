import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { Component, Input, Output, Inject } from '@angular/core';
import { EntityService } from 'app/entity/entity.service';


@Component({
    selector:'deletepopup',
    templateUrl:'./deletedailog.component.html',
    styleUrls:['./deletedailog.component.scss']
    
})
export class DeleteDailog{

    @Input() deleteMsgToDisplay:string;
    @Output() onDelete(){

    for(let entityId of this.data.entityIdList){
         this._entityService.delete(entityId).subscribe(response=>{
             this.onCancel();
         });
     }
    }
    @Output() onCancel(){
        this.dialogRef.close();
    }
    constructor(public dialogRef: MatDialogRef<DeleteDailog>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _entityService?:EntityService) { }


    onNoClick(): void {
        this.dialogRef.close();
    }
}