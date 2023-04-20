import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserProjectFeature as UserProjectFeatureInterface } from '@planyzer/shared-types';
import { ProjectFeature } from '../../projectfeature/entities/projectfeature.entity';
import { User } from '../../user/entity/user.entity';
import { Role } from '../../user/entity/role.entity';

@Entity('userprojectfeature')
export class UserProjectFeature implements UserProjectFeatureInterface {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_userprojectfeature_id',
  })
  id: number;

  @Column()
  projectfeatureId: number;

  @Column()
  userId: number;

  @Column()
  roleId: number;

  @ManyToOne(() => ProjectFeature, (prjf) => prjf.usersProjectFeature, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    foreignKeyConstraintName: 'fk_userprojectfeature_projectfeature_id',
  })
  projectfeature: ProjectFeature;

  @ManyToOne(() => User)
  @JoinColumn({ foreignKeyConstraintName: 'fk_userprojectfeature_user_id' })
  user: User;

  /**
   * One UserProjectFeature can have one role
   * Don't set the ManyToOne relation on Role:
   *  No interest for the application
   */
  @ManyToOne(() => Role)
  @JoinColumn({ foreignKeyConstraintName: 'fk_userprojectfeature_role_id' })
  role: Role;
}
