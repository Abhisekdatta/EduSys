

export class AddressModel{
    constructor(private _countryName:string,
                private _stateName:string,
                private _cityName:string,
                private _pincode:string,
                private _addressLine1:string,
                private _addressLine2?:string){
    }

}