import { Test, TestingModule } from '@nestjs/testing';
import { IncomeFormService } from './income-form.service';

describe('IncomeFormService', () => {
  let service: IncomeFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncomeFormService],
    }).compile();

    service = module.get<IncomeFormService>(IncomeFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
