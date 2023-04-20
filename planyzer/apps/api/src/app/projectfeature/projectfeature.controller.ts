import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectfeatureService } from './projectfeature.service';
import { CreateProjectFeatureDto } from '@planyzer/shared-types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ProjectsFeatures')
@Controller('projectfeature')
export class ProjectfeatureController {
  constructor(private readonly projectfeatureService: ProjectfeatureService) {}

  @Post()
  create(@Body() createProjectfeatureDto: CreateProjectFeatureDto) {
    return this.projectfeatureService.create(createProjectfeatureDto);
  }

  @Get()
  findAll() {
    return this.projectfeatureService.getAllPrFt();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectfeatureService.findOnePrFt(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectfeatureDto: CreateProjectFeatureDto
  ) {
    return this.projectfeatureService.update(+id, updateProjectfeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectfeatureService.deleteProjectFeature(+id);
  }
}
