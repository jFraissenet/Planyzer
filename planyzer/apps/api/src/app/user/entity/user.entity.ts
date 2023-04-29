import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column({
    type: 'text',
    unique: true,
    nullable: true,
  })
  refreshToken!: string | null;

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
