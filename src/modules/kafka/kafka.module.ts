import { Module } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { ProducerService } from '../../application/services/producer/producer.service';
import { ProducerUseCase } from '../../application/usecases/producer.usecase';
import { ProducerController } from 'src/presentation/controllers/producer/producer.controller';
import { Partitioners } from 'kafkajs';

@Module({
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
      useFactory: (kafkaClient: ClientKafka) => kafkaClient,
      inject: ['product_producer_client'],
    },
  ],
})
export class KafkaModule {}
