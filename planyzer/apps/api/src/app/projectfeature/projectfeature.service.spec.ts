import { Test, TestingModule } from '@nestjs/testing';
import { ProjectfeatureService } from './projectfeature.service';

describe('ProjectfeatureService', () => {
  let service: ProjectfeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectfeatureService],
    }).compile();

    service = module.get<ProjectfeatureService>(ProjectfeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
