import { Test, TestingModule } from '@nestjs/testing';
import { AppoinmentController } from './appointment.controller';

describe('AppoinmentController', () => {
  let controller: AppoinmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppoinmentController],
    }).compile();

    controller = module.get<AppoinmentController>(AppoinmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
