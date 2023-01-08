import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  VirtualColumn,
} from 'typeorm';

import { Project as ProjectInterface } from '@planyzer/shared-types';

import { UserProject } from './userproject.entity';
import { Expose } from 'class-transformer';

export const GROUP_PROJECT = 'group_project_details';
export const GROUP_ALL_PROJECTS = 'group_all_projects';

@Entity('project')
export class Project implements ProjectInterface {
  @PrimaryGeneratedColumn()
  @Expose({ groups: [GROUP_PROJECT, GROUP_ALL_PROJECTS] })
  id: number;

  @Column()
  @Expose({ groups: [GROUP_PROJECT, GROUP_ALL_PROJECTS] })
  title: string;

  /**
   * One project can have multiple UserProject
   * One UserProject can have only one Project
   */
  @OneToMany(() => UserProject, (usprj) => usprj.project)
  @JoinColumn()
  @Expose({ groups: [GROUP_PROJECT] })
  usersproject: UserProject[];

  /**
   * Column not managed in database
   * Count users number for current project
   */
  @VirtualColumn({
    query: (alias) =>
      `SELECT COUNT("id") FROM "userproject" WHERE "projectId" = ${alias}.id`,
  })
  @Expose({ groups: [GROUP_PROJECT, GROUP_ALL_PROJECTS] })
  UserNumber: number;
}
