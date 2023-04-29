import { IsEmail, MinLength } from 'class-validator';

import { User } from './user.interface';
//import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto implements Pick<User, 'refreshToken'> {
  refreshToken: string;
}
