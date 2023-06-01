import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ProducerService {
  constructor(
    @Inject('product_producer') private readonly client: ClientKafka,
  ) {}

  execute() {
    return this.client.emit('product-topic', {
      water: 'abc',
      quantity: 10,
      data: new Date().toString(),
    });
  }
}
