import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserProject as UserProjectInterface } from '@planyzer/shared-types';
import {Project} from './project.entity';
import {User} from '../../user/entity/user.entity';
import {Role} from '../../user/entity/role.entity';


@Entity('userproject')
export class UserProject implements UserProjectInterface   {

  // Pimary key
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  //Multi userproject by project
  @ManyToOne(() => Project, (prj) => prj.usersproject)
  @JoinColumn()
  project: Project;


  @Column()
  userId: number;

  //Multi userproject by user
  @ManyToOne(() => User, (prj) => prj.userproject)
  @JoinColumn()
  user: User;


  @Column()
  rlId: number;


  //Multi userproject by role
  @ManyToOne(() => Role, (r) => r.usersprojects)
  @JoinColumn()
  rl: Role;
  
}