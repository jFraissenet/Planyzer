import { Module } from '@nestjs/common';
import { ProjectfeatureService } from './projectfeature.service';
import { ProjectfeatureController } from './projectfeature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectFeature } from './entities/projectfeature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectFeature])],
  controllers: [ProjectfeatureController],
  providers: [ProjectfeatureService],
})
export class ProjectFeatureModule {}
