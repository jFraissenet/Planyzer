import { IsEmail, MinLength } from 'class-validator';

import { User } from './user.interface';

export class CreateUserDto implements Pick<User, 'username' | 'psw' | 'mail'> {
  @MinLength(1)
  username!: string;

  @MinLength(8)
  psw!: string;

  @IsEmail()
  mail!: string;
}
