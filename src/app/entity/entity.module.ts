import { ReactiveFormsModule } from '@angular/forms';
import { EntityService } from './entity.service';
import { EntityRoutingModule } from './entity.routing';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { EntityComponent } from './entity/entity.component';
import { TableOverviewExample } from 'app/entity/user/tableoverview.component';
import { EntityDailog } from './entity/entitydialog/entitydailog.component';
import { DeleteDailog } from 'app/component/delete/deletedailog.component';
import { EntityViewComponent } from 'app/entity/entity/entityview/entityview.component';

@NgModule({
    imports: [
        SharedModule,
        EntityRoutingModule,
        ReactiveFormsModule

    ],
    declarations: [
        EntityDailog,
        DeleteDailog,
        EntityComponent,
        TableOverviewExample,
        EntityViewComponent
        
    ],
    providers:[
        EntityService,
    ],
    entryComponents:[EntityDailog,DeleteDailog,EntityViewComponent]
    
})
export class EntityModule{

}