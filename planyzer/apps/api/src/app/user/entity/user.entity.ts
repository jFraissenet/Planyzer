import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User as UserInterface } from '@planyzer/shared-types';

import { UserProject } from '../../project/entity/userproject.entity';

@Entity('usr')
export class User implements UserInterface   {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username!: string;

  @Column()
  mail: string;

  @Column()
  psw: string;


  @OneToMany(() => UserProject, (usrprj) =>usrprj.user)
  @JoinColumn()
  userproject: UserProject[];
}