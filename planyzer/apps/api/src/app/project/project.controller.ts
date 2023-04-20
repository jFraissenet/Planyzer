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
  Delete,
} from '@nestjs/common';
import { CreateProjectDto, Project, UserProject } from '@planyzer/shared-types';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { GROUP_ALL_PROJECTS, GROUP_PROJECT } from './entity/project.entity';

/**
 * Controller name : Projects
 * ApiTags : Adding section on Swagger API
 * ClassSerializerInterceptor : Uses entity "Expose" decorator to format json queries
 */
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

  /**
   * Project creation
   * Using serialization option to limit data returned
   * @param dto : project
   * @returns : project added
   */
  @Post()
  @SerializeOptions({
    groups: [GROUP_PROJECT],
  })
  createProject(@Body() dto: CreateProjectDto): Promise<Project> {
    return this.projectService.createPr(dto);
  }

  /**
   * Update single project
   * @param id : project id
   * @param dto : New project
   * @returns : Project updated
   */
  @Put(':id')
  @SerializeOptions({
    groups: [GROUP_ALL_PROJECTS],
  })
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateProjectDto
  ): Promise<Project> {
    return this.projectService.updateProject(id, dto);
  }

  @Delete(':id')
  deleteProject(@Param('id', ParseIntPipe) id: number): void {
    this.projectService.deleteProject(id);
  }
}

/**
 * Controller name : usersprojects
 * ApiTags : Adding section on Swagger API
 * ClassSerializerInterceptor : Uses entity "Expose" decorator to format json queries
 */
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
