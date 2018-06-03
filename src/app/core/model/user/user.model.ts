import { Authority } from './authority.enum';

export class User {
  
  constructor(
    public id:number,
    public username: string,
    public firstname: string,
    public lastname: string,
    public email: string,
    public authorities: Array<Authority>,
    public enabled: boolean
  ) {}

}