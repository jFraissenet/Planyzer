import { Test, TestingModule } from '@nestjs/testing';
import { UserprojectfeatureController } from './userprojectfeature.controller';
import { UserprojectfeatureService } from './userprojectfeature.service';

describe('UserprojectfeatureController', () => {
  let controller: UserprojectfeatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserprojectfeatureController],
      providers: [UserprojectfeatureService],
    }).compile();

    controller = module.get<UserprojectfeatureController>(UserprojectfeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
