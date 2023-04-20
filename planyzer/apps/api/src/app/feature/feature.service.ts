import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { CreateFeatureDto } from '@planyzer/shared-types';

import { Repository } from 'typeorm';

import { Feature } from './entities/feature.entity';

//import { UpdateFeatureDto } from '../../../../../libs/shared-types/src/lib/feature/update-feature.dto';

@Injectable()
export class FeatureService {
  constructor(
    @InjectRepository(Feature)
    private featureRepository: Repository<Feature>
  ) {}
  /*
  create(createFeatureDto: CreateFeatureDto) {
    return 'This action adds a new feature';
  }
*/
  findAll(): Promise<Feature[]> {
    return this.featureRepository.find();
  }

  findOne(id: number): Promise<Feature> {
    return this.featureRepository.findOneByOrFail({ id: id });
  }
  /*
  update(id: number, updateFeatureDto: UpdateFeatureDto) {
    return `This action updates a #${id} feature`;
  }

  remove(id: number) {
    return `This action removes a #${id} feature`;
  }
  */
}
