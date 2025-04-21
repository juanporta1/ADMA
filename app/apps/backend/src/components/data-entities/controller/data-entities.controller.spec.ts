import { Test, TestingModule } from '@nestjs/testing';
import { DataEntitiesController } from './data-entities.controller';

describe('DataEntitiesController', () => {
  let controller: DataEntitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataEntitiesController],
    }).compile();

    controller = module.get<DataEntitiesController>(DataEntitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
