import { Role } from './Role';
// tslint:disable-next-line:no-empty-interface
export class User{


constructor(public username: string, public name: string, public email: string, public password: string, public roles: Role[] ){

}


}