import { EntityComponent } from './entity/entity.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { TableOverviewExample } from 'app/entity/user/tableoverview.component';

const routes: Routes = [
    {
        path:'',
        component:EntityComponent
    },
    {
        path:'entity',
        component:EntityComponent
    },
    {
        path:'tableoverview',
        component:TableOverviewExample
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class EntityRoutingModule{

}