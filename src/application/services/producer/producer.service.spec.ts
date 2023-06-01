import { Test, TestingModule } from '@nestjs/testing';
import { ProducerService } from './producer.service';

describe('ProducerService', () => {
  let service: ProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        {
          provide: 'product_producer',
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
