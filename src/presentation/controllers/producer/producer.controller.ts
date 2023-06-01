import { Controller, Get } from '@nestjs/common';
import { ProducerUseCase } from '../../../application/usecases/producer.usecase';

@Controller('producer')
export class ProducerController {
  constructor(private readonly producerUseCase: ProducerUseCase) {}

  @Get()
  handler() {
    return this.producerUseCase.execute();
  }
}
