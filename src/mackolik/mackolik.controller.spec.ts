import { Test, TestingModule } from '@nestjs/testing';
import { MackolikController } from './mackolik.controller';

describe('MackolikController', () => {
  let controller: MackolikController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MackolikController],
    }).compile();

    controller = module.get<MackolikController>(MackolikController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
