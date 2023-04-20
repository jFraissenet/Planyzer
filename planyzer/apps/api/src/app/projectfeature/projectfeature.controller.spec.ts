import { Test, TestingModule } from '@nestjs/testing';
import { ProjectfeatureController } from './projectfeature.controller';
import { ProjectfeatureService } from './projectfeature.service';

describe('ProjectfeatureController', () => {
  let controller: ProjectfeatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectfeatureController],
      providers: [ProjectfeatureService],
    }).compile();

    controller = module.get<ProjectfeatureController>(ProjectfeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
