import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserProjectFeatureDto } from '@planyzer/shared-types';
import { UserProjectFeature } from './entities/userprojectfeature.entity';
import { UpdateUserProjectFeatureDto } from '@planyzer/shared-types';
import { UserProjectFeatureController } from './userprojectfeature.controller';

@Injectable()
export class UserprojectfeatureService {
  constructor(
    @InjectRepository(UserProjectFeature)
    private readonly userprojectfeaturerepository: Repository<UserProjectFeature>
  ) {}
  create(createUserprojectfeatureDto: CreateUserProjectFeatureDto) {
    return 'This action adds a new userprojectfeature';
  }

  findAll() {
    const entity = this.userprojectfeaturerepository.find();
    return entity;
  }

  findOne(id: number) {
    return `This action returns a #${id} userprojectfeature`;
  }

  update(id: number, updateUserprojectfeatureDto: UpdateUserProjectFeatureDto) {
    return `This action updates a #${id} userprojectfeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} userprojectfeature`;
  }
}
