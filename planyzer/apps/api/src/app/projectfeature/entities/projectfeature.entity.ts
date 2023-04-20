import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectFeature as ProjectFeatureInterface } from '@planyzer/shared-types';
import { Project } from '../../project/entity/project.entity';
import { Feature } from '../../feature/entities/feature.entity';
import { UserProjectFeature } from '../../userprojectfeature/entities/userprojectfeature.entity';

@Entity('projectfeature')
export class ProjectFeature implements ProjectFeatureInterface {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_projectfeature_id' })
  id: number;

  @Column()
  comment: string;

  @Column()
  projectId: number;

  @ManyToOne(() => Project, (prj) => prj.projectFeatures, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ foreignKeyConstraintName: 'fk_projectfeature_project_id' })
  project: Project;

  @Column()
  featureId: number;

  @ManyToOne(() => Feature, (ft) => ft.projectFeatures)
  //@ManyToOne(() => Feature)
  @JoinColumn({ foreignKeyConstraintName: 'fk_projectfeature_feature_id' })
  feature: Feature;

  @OneToMany(() => UserProjectFeature, (usrpf) => usrpf.projectfeature)
  usersProjectFeature: UserProjectFeature[];
}
