import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import {
  User,
  Role,
  SignupRsp,
  CreateUserDto,
  LoginRsp,
} from '@planyzer/shared-types';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { LogginDto } from 'libs/shared-types/src/lib/user/create-user.dto';

// Add controller tag on swagger
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   *
   * @returns All users
   */
  @Get()
  all(): Promise<User[]> {
    return this.userService.getAll_usr();
  }

  /**
   *
   * @param id User id
   * @returns The user
   */
  @Get(':id')
  one(@Param('id') id: number): Promise<User> {
    return this.userService.getOne_usr(id);
  }

  /**
   *
   * @param dto New User
   * @returns User mail
   */
  @Post('signup')
  SignUp(@Body() dto: CreateUserDto): Promise<SignupRsp> {
    return this.userService.create_usr(dto);
  }

  @Post('login')
  async login(@Body() user: LogginDto): Promise<LoginRsp> {
    console.log(user);
    return await this.userService.login(user);
  }
}

// Add controller tag on swagger
@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly userService: UserService) {}

  /**
   *
   * @returns All users
   */
  @Get()
  all(): Promise<Role[]> {
    return this.userService.getAll_rl();
  }
}
