import { IsEmail, MinLength } from 'class-validator';

import { User } from './user.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements Pick<User, 'username' | 'psw' | 'mail'> {
  @ApiProperty({ example: 'Pseudo' })
  @MinLength(1)
  username!: string;

  @ApiProperty({ example: 'password' })
  @MinLength(8)
  psw!: string;

  @ApiProperty({ example: 'pseudo@gmail.com' })
  @IsEmail()
  mail!: string;
}

export class LogginDto implements Pick<User, 'psw' | 'mail'> {
  @ApiProperty({ example: 'password' })
  @MinLength(8)
  psw: string;

  @ApiProperty({ example: 'pseudo@gmail.com' })
  @IsEmail()
  mail: string;
}
