import { Test, TestingModule } from '@nestjs/testing';
import { ProducerController } from './producer.controller';
import { ProducerUseCase } from '../../../application/usecases/producer.usecase';
import { ProducerService } from '../../../application/services/producer/producer.service';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

describe('ProducerController', () => {
  let controller: ProducerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'product_producer_client',
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'client_product_producer',
                brokers: ['localhost:29092'],
              },
              consumer: {
                groupId: 'group_client_product_producer',
              },
              producer: {
                createPartitioner: Partitioners.LegacyPartitioner,
              },
            },
          },
        ]),
      ],
      controllers: [ProducerController],
      providers: [
        ProducerUseCase,
        ProducerService,
        {
          provide: 'product_producer',
          useValue: ClientKafka,
        },
      ],
    }).compile();

    controller = module.get<ProducerController>(ProducerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
