import { Test, TestingModule } from '@nestjs/testing';
import { UserprojectfeatureService } from './userprojectfeature.service';

describe('UserprojectfeatureService', () => {
  let service: UserprojectfeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserprojectfeatureService],
    }).compile();

    service = module.get<UserprojectfeatureService>(UserprojectfeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
