import { MinLength } from 'class-validator';

import { ProjectType } from './projecttype.interface';

export class CreateProjectTypeDto implements Pick<ProjectType, 'picture'> {
  //@IsNumber()
  //id: number;

  @MinLength(1)
  picture: string;
}
