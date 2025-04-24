import { Test, TestingModule } from '@nestjs/testing';
import { CastrationService } from './castration.service';

describe('CastrationService', () => {
  let service: CastrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CastrationService],
    }).compile();

    service = module.get<CastrationService>(CastrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
