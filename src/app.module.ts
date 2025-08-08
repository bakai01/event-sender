import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EdaBrokerModule } from './eda-broker/eda-broker.module';

@Module({
  imports: [EdaBrokerModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
