import { Test, TestingModule } from '@nestjs/testing';
import { DataEntitiesService } from './data-entities.service';

describe('DataEntitiesService', () => {
  let service: DataEntitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataEntitiesService],
    }).compile();

    service = module.get<DataEntitiesService>(DataEntitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
