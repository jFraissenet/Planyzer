import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  VirtualColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Project as ProjectInterface } from '@planyzer/shared-types';

import { UserProject } from './userproject.entity';
import { ProjectType } from './projecttype.entity';

import { Expose } from 'class-transformer';
import { ProjectFeature } from '../../projectfeature/entities/projectfeature.entity';

// This group returned all properties : Project Detail
export const GROUP_PROJECT = 'group_project_details';

// This group returnes some properties usefull : For the home page
export const GROUP_ALL_PROJECTS = 'group_all_projects';

@Entity('project')
export class Project implements ProjectInterface {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_project_id' })
  @Expose({ groups: [GROUP_PROJECT, GROUP_ALL_PROJECTS] })
  id: number;

  @Column()
  @Expose({ groups: [GROUP_PROJECT, GROUP_ALL_PROJECTS] })
  title: string;

  @Column()
  @Expose({ groups: [GROUP_PROJECT, GROUP_ALL_PROJECTS] })
  description: string;

  /**
   * One project can have multiple UserProject
   * One UserProject can have only one Project
   */
  @OneToMany(() => UserProject, (usprj) => usprj.project)
  @JoinColumn()
  @Expose({ groups: [GROUP_PROJECT] })
  usersProject: UserProject[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  projectTypeId: number;

  @Column()
  startAt: Date;

  @Column()
  endAt: Date;

  /**
   * Multi userproject by project
   * onDelete sets the projectId foreign key to CASCADE onDelete on Project.
   * When a Project is deleted, usersproject are deleted.
   */
  @ManyToOne(() => ProjectType, (prjt) => prjt.projects)
  @JoinColumn({ foreignKeyConstraintName: 'fk_project_type_id' })
  @Expose({ groups: [GROUP_PROJECT, GROUP_ALL_PROJECTS] })
  projectType: ProjectType;

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

  @Expose({ groups: [GROUP_PROJECT] })
  @OneToMany(() => ProjectFeature, (prjf) => prjf.project)
  projectFeatures: ProjectFeature[];
}
