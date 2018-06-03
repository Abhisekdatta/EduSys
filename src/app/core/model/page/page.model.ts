import { OperationModel } from '../operation/operation.model';


export class PageModel{
   

    constructor(public id:number,
                public name:string,
                public url:string,
                public key:string,
                public operationBeanList:Array<OperationModel>){}
}