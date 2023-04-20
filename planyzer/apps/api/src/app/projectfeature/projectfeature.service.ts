import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProjectFeatureDto } from '@planyzer/shared-types';
import { ProjectFeature } from './entities/projectfeature.entity';

//import { UpdateProjectfeatureDto } from './dto/update-projectfeature.dto';

@Injectable()
export class ProjectfeatureService {
  constructor(
    @InjectRepository(ProjectFeature)
    private projectfeaturerepository: Repository<ProjectFeature>
  ) {}

  create(createProjectfeatureDto: CreateProjectFeatureDto) {
    return 'This action adds a new projectfeature';
  }

  getAllPrFt(): Promise<ProjectFeature[]> {
    const entity = this.projectfeaturerepository.find({
      relations: {
        usersProjectFeature: true,
      },
    });
    return entity;
  }

  findOnePrFt(id: number): Promise<ProjectFeature> {
    const entity = this.projectfeaturerepository.findOne({
      where: {
        id: id,
      },
    });
    return entity;
  }

  update(id: number, updateProjectfeatureDto: CreateProjectFeatureDto) {
    return `This action updates a #${id} projectfeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectfeature`;
  }

  deleteProjectFeature(id: number): void {
    this.projectfeaturerepository.delete(id);
  }
}
