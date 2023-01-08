import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {CreateUserDto} from '@planyzer/shared-types';

import { User } from './entity/user.entity';
import { Role } from './entity/role.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userrepository: Repository<User>,
        @InjectRepository(Role) private readonly rolerepository: Repository<Role>
      ) {}
    

      create_usr(dto: CreateUserDto): Promise<User> {
        const entity = this.userrepository.create(dto);
        return this.userrepository.save(entity);
      }


      getAll_usr(): Promise<User[]> {
        const entity = this.userrepository.find();
        return entity;
      }

      getOne_usr(id: number): Promise<User> {
        const entity = this.userrepository.findOne(
          {
            where: {
              id: id
            }
          }
        );
        return entity;
      }


      getAll_rl(): Promise<Role[]> {
        const entity = this.rolerepository.find();
        return entity;
      }
      

}
