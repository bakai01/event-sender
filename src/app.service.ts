import { Inject, Injectable } from '@nestjs/common';
import {
  CompanyCreatedPayload,
  IMessagePublisher,
} from '@yourgoods-eda/contracts';
import { EDA_PUBLISHER } from '@yourgoods-eda/contracts/nest';

@Injectable()
export class AppService {
  constructor(
    @Inject(EDA_PUBLISHER)
    private readonly publisher: IMessagePublisher,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async sendEvent(dto: CompanyCreatedPayload): Promise<void> {
    await this.publisher.publish('COMPANY_CREATED', dto);
  }
}
