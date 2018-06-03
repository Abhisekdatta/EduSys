import { EntityModel } from './../entity.model';
import { EntityService } from 'app/entity/entity.service';
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';


@Component({
    templateUrl:'./entityview.component.html',
    styleUrls:['./entityview.component.scss']
})
export class EntityViewComponent{
  name:string;
  // private entityModel:EntityModel;
    tiles = [
        {text: 'Code:'+this.entityModel.code, cols: 2, rows: 1, color: 'lightblue'},
        {text: 'Fax No.:'+this.entityModel.faxNo, cols: 2, rows: 1, color: 'lightgreen'},
        {text: 'Web site:'+this.entityModel.webSite, cols: 4, rows: 1, color: '#DDBDF1'},
        {text: 'Address Line1:'+this.entityModel.addressLine1, cols: 4, rows: 1, color: 'lightpink'},
        {text: 'Address Line12:'+this.entityModel.addressLine2, cols: 4, rows: 1, color: '#DDBDF1'},
       
      ];

      constructor(@Inject(MAT_SNACK_BAR_DATA) public entityModel: EntityModel,
                  private _entityService:EntityService) { 
                    // _entityService.findOne(this.entityId).subscribe(response=>{
                    //     this.entityModel=response;
                    //     console.log(this.entityModel);
                    //     this.name="sdsdf";
                    // });
       }
}