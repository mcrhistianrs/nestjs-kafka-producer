import { Injectable } from '@nestjs/common';
import { ProducerService } from '../services/producer/producer.service';

@Injectable()
export class ProducerUseCase {
  constructor(private readonly producerService: ProducerService) {}
  execute() {
    return this.producerService.execute();
  }
}
