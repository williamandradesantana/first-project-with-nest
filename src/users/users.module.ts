import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UserServices } from './users.service.js';
import { PasswordService } from '../password/password.service.js';
import { PasswordModule } from '../password/password.module.js';

@Module({
  imports: [PasswordModule],
  controllers: [UsersController],
  providers: [UserServices],
  exports: [UserServices],
})
export class UsersModule {}
