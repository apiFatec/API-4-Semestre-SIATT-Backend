import { Test, TestingModule } from '@nestjs/testing';
import { Api4SemController } from './api-4-sem.controller';
import { Api4SemService } from './api-4-sem.service';

describe('Api4SemController', () => {
  let controller: Api4SemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Api4SemController],
      providers: [Api4SemService],
    }).compile();

    controller = module.get<Api4SemController>(Api4SemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
