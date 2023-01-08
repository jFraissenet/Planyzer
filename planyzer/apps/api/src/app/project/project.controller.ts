import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
  Put,
  UseInterceptors,
  SerializeOptions,
} from '@nestjs/common';
import { CreateProjectDto, Project, UserProject } from '@planyzer/shared-types';
import { ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { GROUP_ALL_PROJECTS, GROUP_PROJECT } from './entity/project.entity';

// Add controller tag on swagger
@ApiTags('Projects')
@Controller('projects')
@UseInterceptors(ClassSerializerInterceptor)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  /**
   *
   * @returns All projects
   */
  @Get()
  @SerializeOptions({
    groups: [GROUP_ALL_PROJECTS],
  })
  all(): Promise<Project[]> {
    return this.projectService.getAllPr();
  }

  /**
   * Pipe Validation
   * @param id Project id
   * @returns The project
   */
  @Get(':id')
  @SerializeOptions({
    groups: [GROUP_PROJECT],
  })
  one(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return this.projectService.getOnePr(id);
  }

  @Post()
  createProject(@Body() dto: CreateProjectDto): Promise<Project> {
    return this.projectService.createPr(dto);
  }

  @Put(':id')
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateProjectDto
  ): Promise<Project> {
    return this.projectService.updateProject(id, dto);
  }
}

// Add controller tag on swagger
@ApiTags('UsersProjects')
@Controller('usersprojects')
export class UserProjectController {
  constructor(private readonly projectService: ProjectService) {}

  /**
   *
   * @returns All user projects
   */
  @Get()
  all(): Promise<UserProject[]> {
    return this.projectService.getAllUpr();
  }

  /**
   *
   * @param id UserProject id
   * @returns The userproject
   */
  @Get(':id')
  onea(@Param('id', ParseIntPipe) id: number): Promise<UserProject> {
    return this.projectService.getOneUpr(id);
  }
}
