import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserServices } from './users.service.js';
import { type UserResponseDTO } from './dtos/user-response.dto.js';
import { type CreateUserDTO } from './dtos/create-user.dto.js';
import { type UpdateUserDTO } from './dtos/user-update.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UserServices) {}

  @Get()
  @HttpCode(200)
  allUsers(): Promise<UserResponseDTO[]> {
    return this.userServices.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  oneUser(@Param('id') id: string): Promise<UserResponseDTO> {
    return this.userServices.getOne(id);
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() request: CreateUserDTO): Promise<UserResponseDTO> {
    return this.userServices.create(request);
  }

  @Put(':id')
  @HttpCode(200)
  updateUser(
    @Param('id') id: string,
    @Body() request: UpdateUserDTO,
  ): Promise<UserResponseDTO> {
    return this.userServices.update(id, request);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.userServices.delete(id);
  }
}
