import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from '@planyzer/shared-types';
import { ApiTags } from '@nestjs/swagger';
//import { UpdateFeatureDto } from '../../../../../libs/shared-types/src/lib/feature/update-feature.dto';

@ApiTags('Features')
@Controller('feature')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}
  /*
  @Post()
  create(@Body() createFeatureDto: CreateFeatureDto) {
    return this.featureService.create(createFeatureDto);
  }
*/
  @Get()
  findAll() {
    return this.featureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featureService.findOne(+id);
  }
  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeatureDto: CreateFeatureDto) {
    return this.featureService.update(+id, updateFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featureService.remove(+id);
  }
  */
}
