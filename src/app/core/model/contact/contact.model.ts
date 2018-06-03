


export class ContactModel{
    constructor(private _contactType:string,
                private _contact:string){}

    get contactType():string{
        return this._contactType;
    }
    get contact():string{
        return this._contact;
    }
}