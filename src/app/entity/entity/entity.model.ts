

export class EntityModel{

    constructor(
        public id:number,
        public name:string,
        public code:string,
        public email:string,
        public contactNo:string,
        public faxNo:string,
        public webSite:string,
        public addressLine1:string,
        public addressLine2:string,
        public numberOfUser:string,
        public contractStartDate:Date,
        public contractEndDate:Date,
        public isActive:boolean,
        public entityType:string
    ){}
}