import { Test, TestingModule } from '@nestjs/testing';
import { MackolikService } from './mackolik.service';

describe('MackolikService', () => {
  let service: MackolikService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MackolikService],
    }).compile();

    service = module.get<MackolikService>(MackolikService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
