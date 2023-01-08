import { Controller, Get, Param } from '@nestjs/common';
import { User, Role } from '@planyzer/shared-types';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

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
