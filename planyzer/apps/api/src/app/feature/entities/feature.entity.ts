import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Feature as FeatureInterface } from '@planyzer/shared-types';
import { ProjectFeature } from '../../projectfeature/entities/projectfeature.entity';

@Entity('feature')
export class Feature implements FeatureInterface {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_feature_id' })
  id: number;

  @Column()
  title: string;

  @Column()
  comment: string;

  @OneToMany(() => ProjectFeature, (prjf) => prjf.feature)
  @JoinColumn()
  projectFeatures: ProjectFeature[];
}
