import { Test, TestingModule } from '@nestjs/testing';
import { PdfServiceService } from './pdf-service.service';

describe('PdfServiceService', () => {
  let service: PdfServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfServiceService],
    }).compile();

    service = module.get<PdfServiceService>(PdfServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
