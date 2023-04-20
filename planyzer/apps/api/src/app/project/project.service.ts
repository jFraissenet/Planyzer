import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProjectDto } from '@planyzer/shared-types';
import { Project } from './entity/project.entity';

import { CreateUserProjectDto } from '@planyzer/shared-types';
import { UserProject } from './entity/userproject.entity';

/*
import { CreateProjectTypeDto } from '@planyzer/shared-types';
import { ProjectType } from './entity/projecttype.entity';
*/

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectrepository: Repository<Project>,
    @InjectRepository(UserProject)
    private userprojectrepository: Repository<UserProject>
  ) {}

  /* PROJECT */

  createPr(dto: CreateProjectDto) /*: Promise<Project> */ {
    const entity = this.projectrepository.create(dto);
    return this.projectrepository.save(entity);
  }

  getAllPr(): Promise<Project[]> {
    const entity = this.projectrepository.find({
      // 2 levels of depth
      // Join FROM Project --> UserProject --> User
      relations: [
        'projectType',
        'usersProject',
        'usersProject.user',
        'usersProject.rl',
        'projectFeatures',
      ],
    });
    return entity;
  }

  getOnePr(id: number): Promise<Project> {
    const entity = this.projectrepository.findOne({
      where: {
        id: id,
      },
      relations: [
        'usersProject',
        'projectFeatures',
        'projectFeatures.usersProjectFeature',
      ],
    });
    return entity;
  }

  updateProject(id: number, updateddto: CreateProjectDto): Promise<Project> {
    this.projectrepository.update(id, updateddto);

    return this.getOnePr(id);
  }

  deleteProject(id: number): void {
    this.projectrepository.delete(id);
  }

  /* USER PROJECT */

  createUpr(dto: CreateUserProjectDto): Promise<UserProject> {
    const entity = this.userprojectrepository.create(dto);
    return this.userprojectrepository.save(entity);
  }

  getAllUpr(): Promise<UserProject[]> {
    const entity = this.userprojectrepository.find();
    return entity;
  }

  getOneUpr(id: number): Promise<UserProject> {
    const entity = this.userprojectrepository.findOne({
      where: {
        id: id,
      },
    });
    return entity;
  }
}
