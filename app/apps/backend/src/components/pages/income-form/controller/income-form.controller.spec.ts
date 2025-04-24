import { Test, TestingModule } from '@nestjs/testing';
import { IncomeFormController } from './income-form.controller';

describe('IncomeFormController', () => {
  let controller: IncomeFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomeFormController],
    }).compile();

    controller = module.get<IncomeFormController>(IncomeFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
