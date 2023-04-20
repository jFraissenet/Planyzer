import { Module } from '@nestjs/common';
import { UserprojectfeatureService } from './userprojectfeature.service';
import { UserProjectFeatureController } from './userprojectfeature.controller';
import { UserProjectFeature } from './entities/userprojectfeature.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserProjectFeature])],
  controllers: [UserProjectFeatureController],
  providers: [UserprojectfeatureService],
})
export class UserProjectFeatureModule {}
