import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { CompanyCreatedPayload } from '@yourgoods/eda-contracts';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('send-event')
  sendEvent(@Body() dto: CompanyCreatedPayload): Promise<void> {
    return this.appService.sendEvent(dto);
  }
}
