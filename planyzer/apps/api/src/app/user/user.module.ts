import { Module } from '@nestjs/common';
import { UserService } from './user.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entity/user.entity';
import { UserController } from './user.controller';

import { Role } from './entity/role.entity';
import { RoleController } from './user.controller';
import { PasswordHasherService } from './auth/psw-hasher.service';
import { JwtService } from '@nestjs/jwt';
//import { jwtConstants } from './auth/jwt.constants';

@Module({
  imports: [
    //JwtModule.register({ secret: jwtConstants.secret }),
    TypeOrmModule.forFeature([User, Role]),
  ],
  providers: [UserService, PasswordHasherService, JwtService],
  controllers: [UserController, RoleController],
  exports: [UserService], // Imported in auth.module.ts
})
export class UserModule {}
