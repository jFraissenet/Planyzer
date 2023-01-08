import { Module } from '@nestjs/common';
import { UserService } from './user.service';

import { TypeOrmModule } from '@nestjs/typeorm';
 
import { User } from './entity/user.entity';
import { UserController } from './user.controller';

import { Role } from './entity/role.entity';
import { RoleController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UserService],
  controllers: [UserController, RoleController],
})
export class UserModule {}
