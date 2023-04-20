import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserProject as UserProjectInterface } from '@planyzer/shared-types';
import { Project } from './project.entity';
import { User } from '../../user/entity/user.entity';
import { Role } from '../../user/entity/role.entity';

@Entity('userproject')
export class UserProject implements UserProjectInterface {
  // Pimary key
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_usersproject_id' })
  id: number;

  @Column()
  projectId: number;

  /**
   * Multi userproject by project
   * onDelete sets the projectId foreign key to CASCADE onDelete on Project.
   * When a Project is deleted, usersproject are deleted.
   */
  @ManyToOne(() => Project, (prj) => prj.usersProject, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ foreignKeyConstraintName: 'fk_userproject_project_id' })
  project: Project;

  @Column({})
  userId: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  //Multi userproject by user
  @ManyToOne(() => User, (prj) => prj.userProject)
  @JoinColumn({ foreignKeyConstraintName: 'fk_userproject_user_id' })
  user: User;

  @Column()
  rlId: number;

  //Multi userproject by role
  @ManyToOne(() => Role, (r) => r.usersProjects)
  @JoinColumn({ foreignKeyConstraintName: 'fk_userproject_role_id' })
  rl: Role;
}
