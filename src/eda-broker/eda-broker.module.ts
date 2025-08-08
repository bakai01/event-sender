import {
  DynamicModule,
  Global,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import {
  SOURCE_SERVICE,
  RabbitmqPublisher,
  RabbitmqChannelAdapter,
  RabbitmqConsumer,
  RabbitmqConnectionManager,
} from '@yourgoods/eda-contracts';

@Global()
@Module({})
export class EdaBrokerModule
  implements OnApplicationShutdown, OnApplicationBootstrap
{
  static forRoot(): DynamicModule {
    const connectionProvider = {
      provide: RabbitmqConnectionManager,
      useFactory: () => {
        return new RabbitmqConnectionManager({
          uri: 'amqp://guest:guest@localhost:5673',
        });
      },
    };

    const channelAdapterProvider = {
      provide: RabbitmqChannelAdapter,
      useFactory: (connection: RabbitmqConnectionManager) => {
        return new RabbitmqChannelAdapter(connection);
      },
      inject: [RabbitmqConnectionManager],
    };

    const publisherProvider = {
      provide: RabbitmqPublisher,
      useFactory: (adapter: RabbitmqChannelAdapter) => {
        return new RabbitmqPublisher(adapter, SOURCE_SERVICE.AUTH_SERVICE);
      },
      inject: [RabbitmqChannelAdapter],
    };

    const consumerProvider = {
      provide: RabbitmqConsumer,
      useFactory: (adapter: RabbitmqChannelAdapter) => {
        return new RabbitmqConsumer(adapter, SOURCE_SERVICE.AUTH_SERVICE);
      },
      inject: [RabbitmqChannelAdapter],
    };

    return {
      module: EdaBrokerModule,
      providers: [
        connectionProvider,
        channelAdapterProvider,
        publisherProvider,
        consumerProvider,
      ],
      exports: [RabbitmqPublisher, RabbitmqConsumer],
    };
  }

  constructor(private readonly connectionManager: RabbitmqConnectionManager) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.connectionManager.getChannel();
  }

  async onApplicationShutdown(): Promise<void> {
    await this.connectionManager.close();
  }
}
