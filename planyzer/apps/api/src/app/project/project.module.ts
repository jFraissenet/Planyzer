import { ProjectService } from './project.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './entity/project.entity';
import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { UserProject } from './entity/userproject.entity';
import { ProjectType } from './entity/projecttype.entity';
import { ProjectController, UserProjectController } from './project.controller';

import { LoggerMiddleware } from './project.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Project, UserProject, ProjectType])],
  providers: [ProjectService],
  controllers: [ProjectController, UserProjectController],
})
export class ProjectModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'projects', method: RequestMethod.GET });
  }
}
