import { Auth } from './auth.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class AuthDto implements Pick<Auth, 'mail' | 'psw'> {
  @ApiProperty({ example: 'pseudo@gmail.com' })
  @IsEmail()
  mail!: string;

  @ApiProperty({ example: 'password' })
  @MinLength(8)
  psw!: string;
}
