import { MinLength, IsNotEmpty, IsNumber } from 'class-validator';

import { Project } from './project.interface';

export class CreateProjectDto implements Pick<Project, 'title'> {
  //@IsNumber()
  //id: number;

  @MinLength(1)
  title: string;
}
