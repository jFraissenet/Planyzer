import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
//import {Request} from '../../types/express/index';
import { CreateUserDto, RefreshTokenDto } from '@planyzer/shared-types';
import { AuthService } from './auth.service';
import { AuthDto } from '@planyzer/shared-types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { RefreshTokenGuard } from '../common/guards/refreshToken.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Get('logout')
  logout(@Req() req: Request) {
    // user properties needs to be added
    // Create type Express  index.d.ts with Express interface
    // Add it in tsconfig.ts
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    // user properties needs to be added
    // Create type Express  index.d.ts with Express interface
    // Add it in tsconfig.ts
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
