import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserprojectfeatureService } from './userprojectfeature.service';
import { CreateUserProjectFeatureDto } from '@planyzer/shared-types';
import { UpdateUserProjectFeatureDto } from '@planyzer/shared-types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('UserProjectFeature')
@Controller('userprojectfeature')
export class UserProjectFeatureController {
  constructor(
    private readonly userprojectfeatureService: UserprojectfeatureService
  ) {}

  @Post()
  create(@Body() createUserprojectfeatureDto: CreateUserProjectFeatureDto) {
    return this.userprojectfeatureService.create(createUserprojectfeatureDto);
  }

  @Get()
  findAll() {
    return this.userprojectfeatureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userprojectfeatureService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserprojectfeatureDto: UpdateUserProjectFeatureDto
  ) {
    return this.userprojectfeatureService.update(
      +id,
      updateUserprojectfeatureDto
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userprojectfeatureService.remove(+id);
  }
}
