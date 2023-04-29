import { UserProject } from './userproject.interface';

export class CreateUserProjectDto
  //implements Pick<UserProject, 'title'>
{
  
  id: number;

  userId: number;

  projectId: number;

  rlId: number;

}