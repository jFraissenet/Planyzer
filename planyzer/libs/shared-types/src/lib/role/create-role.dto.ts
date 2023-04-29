import { MinLength } from 'class-validator';

//import { Role } from './role.interface';

export class CreateRoleDto
  //implements Pick<Role, 'username' | 'psw' | 'mail'>
{
  @MinLength(1)
  title: string;

}