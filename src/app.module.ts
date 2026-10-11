import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { UsersModule } from './users/users.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

const appKey = process.env.APP_KEY || '';
const appSecret = process.env.APP_SECRET || '';

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: appKey,
      appSecret: appSecret,
      serviceId: 'first-project-with-nest',
    }),
    UsersModule,
  ],
})
export class AppModule {}
