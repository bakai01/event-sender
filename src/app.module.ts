import { Module } from '@nestjs/common';
import { EdaContractsModule } from '@yourgoods/eda-contracts/nest';
import { SOURCE_SERVICE } from '@yourgoods/eda-contracts';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    EdaContractsModule.forRoot({
      isGlobal: true,
      uri: 'amqp://guest:guest@localhost:5673',
      source: SOURCE_SERVICE.AUTH_SERVICE,
      assertTopology: true,
      prefetch: 1,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
