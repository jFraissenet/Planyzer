import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role as RoleInterface } from '@planyzer/shared-types';

import { UserProject } from '../../project/entity/userproject.entity';

@Entity('rl')
export class Role implements RoleInterface {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_role_id' })
  id: number;

  @Column()
  title: string;

  @OneToMany(() => UserProject, (usrprj) => usrprj.rl)
  @JoinColumn()
  usersProjects: UserProject[];
}
