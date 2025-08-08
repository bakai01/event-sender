import { Injectable } from '@nestjs/common';
import {
  CompanyCreatedPayload,
  RabbitmqPublisher,
} from '@yourgoods/eda-contracts';

@Injectable()
export class AppService {
  constructor(private readonly publisher: RabbitmqPublisher) {}

  getHello(): string {
    return 'Hello World!';
  }

  async sendEvent(dto: CompanyCreatedPayload): Promise<void> {
    await this.publisher.publish('COMPANY_CREATED', dto);
  }
}
