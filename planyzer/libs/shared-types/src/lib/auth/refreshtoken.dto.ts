import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { RefreshToken } from './refreshtoken.interface';

export class RefreshTokenDto
  implements Pick<RefreshToken, 'id' | 'refreshToken'>
{
  @ApiProperty({ example: 'pseudo@gmail.com' })
  @IsEmail()
  id: number;

  @ApiProperty({ example: 'refreshToken' })
  refreshToken: string;
}
