import { Test, TestingModule } from '@nestjs/testing';
import { CastrationController } from './castration.controller';

describe('CastrationController', () => {
  let controller: CastrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CastrationController],
    }).compile();

    controller = module.get<CastrationController>(CastrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
