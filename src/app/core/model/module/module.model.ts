import { PageModel } from './../page/page.model';


export class ModuleModel{

    constructor(public id:number,
                public name:string,
                public moduleModel:ModuleModel,
                public moduleIcon:string,
                public pageModuleBeanList:PageModel[]){}
}