import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ProjectType as ProjectTypeInterface } from '@planyzer/shared-types';
import { Project } from './project.entity';

import { Expose } from 'class-transformer';

// This group returned all properties
export const GROUP_PROJECT = 'group_project_details';

// This group returnes some properties usefull
export const GROUP_ALL_PROJECTS = 'group_all_projects';

@Entity('projecttype')
export class ProjectType implements ProjectTypeInterface {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_projecttype_id' })
  @Expose({ groups: [GROUP_PROJECT, GROUP_ALL_PROJECTS] })
  id: number;

  @Column()
  picture: string;

  @OneToMany(() => Project, (prj) => prj.projectType)
  @JoinColumn()
  projects: Project[];
}
