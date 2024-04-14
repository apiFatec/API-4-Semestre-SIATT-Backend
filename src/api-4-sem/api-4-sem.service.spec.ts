import { Test, TestingModule } from '@nestjs/testing';
import { Api4SemService } from './api-4-sem.service';

describe('Api4SemService', () => {
  let service: Api4SemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Api4SemService],
    }).compile();

    service = module.get<Api4SemService>(Api4SemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
