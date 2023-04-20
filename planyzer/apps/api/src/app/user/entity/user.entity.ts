import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User as UserInterface } from '@planyzer/shared-types';

import { UserProject } from '../../project/entity/userproject.entity';

@Entity('usr')
export class User implements UserInterface {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_user_id' })
  id: number;

  @Column()
  username!: string;

  @Column()
  mail: string;

  @Column()
  psw: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  // One User can have multiple userProject
  // One UserProject can have one User
  @OneToMany(() => UserProject, (usrprj) => usrprj.user)
  userProject: UserProject[];
}
